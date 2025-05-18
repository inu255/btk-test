import { useMemo, useEffect, memo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { List, Card, Typography, Input, Select, Space, Pagination, Skeleton } from "antd";
import { debounce } from "lodash-es";
import { Post, useGetPostsQuery } from "shared/api";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page: number = parseInt(searchParams.get("page") || "1", 10);
  const searchTerm: string = searchParams.get("search") || "";
  const sortOrder: "asc" | "desc" = (searchParams.get("sort") as "asc" | "desc") || "asc";

  const { data: allPosts = [], isLoading } = useGetPostsQuery({
    start: 0,
    limit: 100,
  });

  useEffect(() => {
    if (!searchParams.get("page")) {
      navigate(`?page=1&sort=asc`, { replace: true });
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = debounce((value: string) => {
    searchParams.set("search", value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, 500);

  const handleSortChange = (value: "asc" | "desc") => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const processedPosts = useMemo(() => {
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
  }, [allPosts, searchTerm, sortOrder]);

  const paginatedPosts = useMemo(() => {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    return processedPosts.slice(startIndex, startIndex + pageSize);
  }, [processedPosts, page]);

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

          <Select className="md:min-w-[150px]" value={sortOrder} onChange={handleSortChange}>
            <Option value="asc">По возрастанию</Option>
            <Option value="desc">По убыванию</Option>
          </Select>
        </div>

        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <>
            <List
              dataSource={paginatedPosts}
              renderItem={(post) => <PostItem post={post} />}
              locale={{ emptyText: "Нет данных" }}
            />

            <Pagination
              current={page}
              total={processedPosts.length}
              pageSize={10}
              onChange={handlePageChange}
              showSizeChanger={false}
              style={{ textAlign: "center" }}
            />
          </>
        )}
      </Space>
    </div>
  );
};
