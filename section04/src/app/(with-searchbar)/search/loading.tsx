/* loading.tsx 주의사항 */
// 1) layout 컴포넌트처럼 loading.tsx가 생성된 폴더의 하위 컴포넌트에만 적용됨
// 2) 비동기 컴포넌트에만 스트리밍이 적용됨
// 3) 페이지 컴포넌트에만 스트리밍 적용 가능 (일반적인 컴포넌트 파일에는 적용 불가, suspense 컴포넌트 활용해야 함)
// 4) 브라우저에서 쿼리 스트링이 변경될 때는 스트리밍이 동작하지 않음

export default function Loading() {
  return <div>Loading...</div>;
}
