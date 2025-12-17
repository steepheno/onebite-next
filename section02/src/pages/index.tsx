import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

/* getServerSideProps() */
// 프레임워크 내에서 미리 약속된 함수
// 사전 렌더링 과정에서 1번만 실행 -> 서버 측에서만 실행
// window.~~ 메서드 사용 불가
export const getStaticProps = async () => {
  console.log('인덱스 페이지');

  // 컴포넌트보다 먼저 실행 -> 컴포넌트에 필요한 데이터를 불러오는 함수
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
  };
};

export default function Home({
  allBooks,
  recommendedBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendedBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
