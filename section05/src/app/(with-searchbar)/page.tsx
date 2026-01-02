import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';

/* 라우트 세그먼트 옵션 */
// 특정 페이지의 유형을 강제로 Static 또는 Dynamic 페이지로 설정
// 특별한 상황이 아니라면 사용을 권장하지 않음 (Next.js가 알아서 설정하기 때문)
// 1. auto: 아무것도 강제하지 않음 (기본값)
// 2. force-dynamic: 강제로 Dynamic 페이지로 설정
// 3. force-static: 강제로 Static 페이지로 설정
// 4. error - 강제로 Static 페이지로 설정 (설정하면 안 되는 이유가 있다면 빌드 오류 발생)

async function AllBooks() {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecommendedBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/random`,
    { next: { revalidate: 3 } },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recommendedBooks: BookData[] = await response.json();

  return (
    <div>
      {recommendedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecommendedBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
