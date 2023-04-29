import { Dialog } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Card, PostInterface } from "./card";

export const Form: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<PostInterface>();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (!data || data.length == 0) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [data]);
  const close = () => setData([]);

  const createPost = (data: PostInterface) => {
    const loading = toast.loading("Membuat Post...");
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (Array.isArray(data)) {
          setData(data);
        }
      })
      .catch((err) => {
        toast.error("Ada masalah, cek console");
        console.error(err);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };
  return (
    <div>
      {isOpen && (
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
          }}
          className="w-screen top-0 left-0 h-screen fixed flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl px-8 py-4 min-w-[50%] max-w-[80%] md:max-w-[60%]" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl font-semibold">Sukses membuat post!</h1>
            <h3 className="text-xl font-medium">{`Post dengan judul "${getValues("title")}" berhasil dibuat`}</h3>
            <h4 className="font-medium text-sm mt-4 mb-2">{`${data.length} post lain dari pengguna yang sama:`}</h4>
            <div className="p-2 max-h-[40vh] overflow-y-auto">
                {data.map(x=>{
                    return <Card key={"Kartu-"+x.id} {...x} />
                })}
            </div>
            <div onClick={close} className="bg-blue-900 text-blue-200 rounded-lg text-center font-bold text-xl py-2" >Tutup</div>
          </div>
        </div>
      )}
      <form className="text-xl" onSubmit={handleSubmit(createPost)}>
        <h1 className="font-bold text-2xl text-blue-900">Buat Post Baru</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 my-4 gap-x-4 items-start">
          <label htmlFor="username">Nama</label>
          <input className="col-span-2 px-2 py-0.5 rounded-md" {...register("username", { required: true, maxLength: 12 })} />
          {errors?.username?.type === "required" && (
            <div className="text-red-700 col-span-3 md:col-span-2 font-medium text-lg">This field is required</div>
          )}
          {errors?.username?.type === "maxLength" && (
            <div className="text-red-700 col-span-3 md:col-span-2 font-medium text-lg">
              Username cannot exceed 12 characters
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 my-4 gap-x-4 items-start">
          <label htmlFor="title">Judul</label>
          <input className="col-span-2 px-2 py-0.5 rounded-md" {...register("title", { required: true, maxLength: 50 })} />
          {errors?.title?.type === "required" && (
            <div className="text-red-700 col-span-3 md:col-span-2 font-medium text-lg">This field is required</div>
          )}
          {errors?.title?.type === "maxLength" && (
            <div className="text-red-700 col-span-3 md:col-span-2 font-medium text-lg">
              title cannot exceed 50 characters
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 my-4 gap-x-4 items-start">
          <label htmlFor="content">Isi</label>
          <Controller
            name="content"
            render={({ field }) => <textarea className="col-span-2 px-2 py-0.5 rounded-md" {...field} />}
            control={control}
          />{" "}
          {errors?.content?.type === "required" && (
            <div className="text-red-700 col-span-3 md:col-span-2 font-medium text-lg">This field is required</div>
          )}
        </div>
        <button type="submit" className="bg-blue-800 text-blue-200 rounded-lg py-1 px-4 font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};
