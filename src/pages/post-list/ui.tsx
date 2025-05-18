import { Card, Input, List, Select, Skeleton, Space, Typography } from "antd";
import { debounce } from "lodash-es";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Post, useGetPostsQuery } from "shared/api";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface PostItemProps {
  post: Post;
}

const PostItem = memo(({ post }: PostItemProps) => (
  <List.Item>
    <Card className="w-full" title={`#${post.id} ${post.title}`} hoverable>
      <Text type="secondary">{post.body}</Text>
    </Card>
  </List.Item>
));

export const PostList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: posts = [],
    isLoading,
    isFetching,
  } = useGetPostsQuery({
    start: (page - 1) * 10,
    limit: 10,
  });

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setPage(1);
    }, 500),
    []
  );

  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
  }, [posts, searchTerm, sortOrder]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="post-list-container">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:justify-between">
          <Search
            className="md:w-[300px]"
            placeholder="Поиск по заголовку"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Select className="md:min-w-[150px]" value={sortOrder} onChange={setSortOrder}>
            <Option value="asc">По возрастанию</Option>
            <Option value="desc">По убыванию</Option>
          </Select>
        </div>

        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <>
            <List
              dataSource={filteredPosts}
              renderItem={(post) => <PostItem post={post} />}
              pagination={{
                current: page,
                pageSize: 10,
                total: 100,
                onChange: (newPage) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(newPage);
                },
                showSizeChanger: false,
                disabled: isFetching,
              }}
              loading={isFetching}
              locale={{ emptyText: "Нет данных" }}
              split={false}
            />
          </>
        )}
      </Space>
    </div>
  );
};
