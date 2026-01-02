'use server';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  console.log(bookId, content, author);

  if (!content || !author) return;

  // 서버 액션으로 리뷰 추가하기
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      },
    );
    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
