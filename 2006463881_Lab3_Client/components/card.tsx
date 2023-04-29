import { FC } from "react";

export interface PostInterface {
  id?: number;
  username: string;
  title: string;
  content: string;
}

export interface QuoteInterface {
  content: string;
  author: string;
  tags: string[];
}

export const Card: FC<PostInterface> = ({ id, title, content, username }) => {
  return (
    <div className="rounded-lg shadow-lg bg-blue-100 text-slate-800 p-4 mb-4 grid gap-2">
      <div className="flex justify-between items-center gap-x-4">
        <h4 className="font-bold text-xl">{title}</h4> {!!id && <div>{`ID: ${id}`}</div>}
      </div>
      <div className="">
        <p>Isi:</p>
        <div className="max-h-[100px] overflow-auto">{content}</div>
      </div>
      <div className="flex flex-row-reverse font-medium text-slate-600">
        <p>by <span className="italic capitalize">{username}</span> </p>
      </div>
    </div>
  );
};
