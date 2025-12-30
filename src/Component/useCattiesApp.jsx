import { useState, useEffect, useRef } from "react";

const CAT_ENDPOINT_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE = "https://cataas.com/cat/says/";

export const useCattiesApp = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchDataItems = async () => {

    try {
      setLoading(true);

      const factRes = await fetch(CAT_ENDPOINT_FACT);
      const factData = await factRes.json();
      
      const threeFirstWords = factData.fact.split(" ").slice(0, 3).join(" ");
      const encodedText = encodeURIComponent(threeFirstWords);
      const imgRes = await fetch(`${CAT_ENDPOINT_IMAGE}${encodedText}?json=true`);
      const imgData = await imgRes.json();

      setItems(prevItems => [
        ...prevItems,
        {
          id: crypto.RandomUUID(),
          fact: factData.fact,
          imageUrl: imgData.url.startsWith("https")
            ? imgData.url
            : `https://cataas.com${imgData.url}`
        }
      ]);
    } catch (e) {
      console.error("Error fetching cat image:", e);
    } finally {
      setLoading(false);
    }
  };
  fetchDataItems();
}, [page]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    }
  }, [loading]);

  return { items, loading, page, observerRef };
};
