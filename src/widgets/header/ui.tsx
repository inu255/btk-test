import { Link } from "react-router";
import { Typography, Space } from "antd";

const { Title } = Typography;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="md:max-w-[80%] mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <Title className="!text-primary !m-0">LOGO</Title>

          <nav>
            <Space size="middle">
              <Link to="/post-list" className="text-gray-600 hover:text-gray-900 transition-colors">
                Записи
              </Link>
              <Link
                to="/add-post-form"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Новая запись
              </Link>
            </Space>
          </nav>
        </div>
      </div>
    </header>
  );
}
