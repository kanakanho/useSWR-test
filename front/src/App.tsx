function App() {
  async function fetcher(key: string) {
    // keyはuseSWR()の第１引数で渡されたURL
    return fetch(key).then((res) => res.json() as Promise<User | null>);
  }

  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;
