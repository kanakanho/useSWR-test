import useSWR from "swr";
import { User } from "../../global/type";

async function fetcher(key: string) {
  // keyはuseSWR()の第１引数で渡されたURL
  return fetch(key).then((res) => res.json() as Promise<User | null>);
}

function App() {
  const { data, error, isLoading } = useSWR("http://localhost:8787/user", fetcher, {
    refreshInterval: 3000,
    onSuccess: () => {
      // 成功後にデータが存在すればステートを更新
    },
    onError: (err) => {
      // エラーハンドリング処理（例えばログ出力）
      console.error("Error fetching user data:", err);
    },
    onErrorRetry: () => {
      // 再試行をオーバーライド（ここでは何もしない）
    },
  });

  if (error) return <div>エラーです: {error.message}</div>;
  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>名前：{data?.name || "不明"}</h1>
      <h1>メール：{data?.email || "不明"}</h1>
    </div>
  );
}

export default App;
