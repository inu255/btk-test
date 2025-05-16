import { Form, Input, Button, Select, message, Typography } from "antd";
import { useAddPostMutation, useGetUsersQuery } from "./api";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

type FieldType = {
  title: string;
  body: string;
  userId: number;
};

export function New() {
  const [form] = Form.useForm<FieldType>();
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery();
  const [addPost, { isLoading }] = useAddPostMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FieldType) => {
    try {
      await addPost(values).unwrap();
      messageApi.info("Запись успешно добавлена!");
      form.resetFields();
    } catch (err) {
      messageApi.error("Ошибка при добавлении записи!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* // <div className="container"> */}
      {contextHolder}
      <Title level={2}>Новая запись</Title>

      <Form<FieldType> form={form} onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          name="title"
          label="Заголовок"
          rules={[
            { required: true, message: "Заголовок обязателен" },
            { min: 5, message: "Минимум 5 символов" },
          ]}
        >
          <Input placeholder="Введите заголовок" />
        </Form.Item>

        <Form.Item<FieldType>
          name="body"
          label="Содержимое"
          rules={[
            { required: true, message: "Содержимое обязательно" },
            { min: 10, message: "Минимум 10 символов" },
          ]}
        >
          <TextArea rows={4} placeholder="Введите содержимое поста" />
        </Form.Item>

        <Form.Item<FieldType>
          name="userId"
          label="Автор"
          rules={[{ required: true, message: "Выберите пользователя" }]}
        >
          <Select loading={isUsersLoading} placeholder="Выберите пользователя">
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
            {isLoading ? "Отправка..." : "Добавить запись"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
