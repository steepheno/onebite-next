'use server';

import { revalidateTag } from 'next/cache';

// state 변수를 사용하지 않으므로 _로 처리함
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  console.log(bookId, content, author);

  if (!bookId || !content || !author)
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };

  // 서버 액션으로 리뷰 추가하기
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    /* 페이지 재검증 */
    // 1. 특정 주소에 해당하는 페이지만 재전송
    // revalidatePath(`/book/${bookId}`);  // 서버 측에서만 호출할 수 있는 메서드

    // 2. 특정 경로의 모든 동적 페이지 재검증 (모든 도서의 페이지가 한꺼번에 재검증됨)
    // revalidatePath('/book/[id]', 'page');

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout');

    // 5. 태그 값 기준으로 데이터 캐시 재검증 (가장 효율적인 방법)
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다: ${error}`,
    };
  }
}
