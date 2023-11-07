"use client"
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast';

const postBlog = async (title: string | undefined, description: string | undefined) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      // サーバーからの応答が OK ではない場合、エラーを投げる
      throw new Error(`An error occurred: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // レスポンスの JSON を解析して返す
  } catch (error) {
    console.error(error); // コンソールにエラーを出力
    throw error; // エラーを再度投げるか、または適切なエラーハンドリングを行う
  }
};


const PostBlog = () => {

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("投稿中です・・・", {id: "1"});
    await postBlog(titleRef.current?.value, descriptionRef.current?.value)

    toast.success("投稿に成功しました！")

    toast.dismiss();
    router.push("/");
    // router.refresh();
  }
  return (
    <>
      <Toaster/>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostBlog