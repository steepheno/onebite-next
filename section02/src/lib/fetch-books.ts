import { BookData } from '@/type';

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = 'https://onebite-books-server-main-kappa-rust.vercel.app/book';

  // 검색 결과를 불러오는 API 함수 내 조건
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
