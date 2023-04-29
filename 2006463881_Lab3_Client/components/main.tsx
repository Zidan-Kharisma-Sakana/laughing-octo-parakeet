import { FC, useEffect, useState } from "react";
import { Card, PostInterface, QuoteInterface } from "./card";
import { Toaster, toast } from "react-hot-toast";

export const MainComponent: FC = () => {
  const [result, setResult] = useState<any>();
  const [data, setData] = useState<PostInterface[]>([]);
  const [quote, setQuote] = useState<QuoteInterface>();
  useEffect(() => {
    if (data.length == 0 && !!result) {
      setData(result.post);
      setQuote(result.quote);
    }
  }, [result, data]);
  useEffect(() => {
    if (!setQuote || !setData) return;
    fetch("/api/post", {
      method: "GET",
    })
      .then((response) => {
        response.json().then((result) => {
          setResult(result);
        });
      })
      .catch((err) => {
        toast.error("Ada error, cek console");
        console.error(err);
      });
  }, []);
  if (!data || !quote) {
    return (
      <div className="flex h-20 w-full items-center justify-center">
        <img src="/images/spinner.svg" />
      </div>
    );
  }
  return (
    <div>
      <div className="text-blue-700 flex justify-center items-center flex-col gap-4 px-10">
        <p className="italic font-semibold text-2xl text-center">{`"${quote?.content}"`}</p>
        <p>{`--${quote?.author}--`}</p>
      </div>
      <h4 className="mb-4 font-semibold text-xl">{`Ditemukan ${data.length} post:`}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((x) => {
          return <Card key={"jaj" + x.id} {...x} />;
        })}
      </div>
    </div>
  );
};
