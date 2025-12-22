import { useCattiesApp } from "./Component/useCattiesApp";

export default function App() {
  const { items, loading, observerRef } = useCattiesApp();

  return (
    <main>
      <h1>Kitties App</h1>
      <hr />

      {items.map((item, index) => (
        <section key={index}>
          <p>{item.fact}</p>
          <img 
            src={item.imageUrl}
            alt={"A cat saying something"} />
        </section>
      ))}

      {loading && <p>Loading...</p>}

      <div ref={observerRef} ></div>

    </main>
  );
}
