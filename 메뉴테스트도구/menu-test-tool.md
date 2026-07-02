![이미지](images/이미지_1.png)

이번 승인(요청 6)이 풀어주는 것

mdev → iu2om:443 아웃바운드가 열리면 → 위 표의 axios 3개(iu2om 통신)가 통하게 됩니다. 리스트 조회·파일 다운·결과 전송의 네트워크 관문이 해결되는 거죠. 이게 "안 열리면 한 발짝도 못 감"이라던 실질적 첫 관문입니다.

하지만 run:all이 실제로 돌려면 아직 남은 것

승인 외에 다음이 갖춰져야 합니다:

1. 툴 본체 + 전체 node_modules 이관. 이번엔 playwright 단독(3MB)만 옮겼습니다. menutestingtool 저장소 전체 + 이 프로젝트의 모든 의존성(axios, pixelmatch, pngjs, dotenv 등)을 같은 폐쇄망 오프라인 방식으로 옮겨야 합니다. (이번에 확립한 레시피 재사용 — 다만 node_modules가 훨씬 큼)
2. .env 설정. POC_BASE_URL, POC_USER_ID/PW(+admin), POC_OMNI_API_KEY(iu2om 모든 API의 X-API-Key), POC_DIFF_FAIL_RATIO, 뷰포트 등. 이거 없으면 아무 스크립트도 안 뜹니다(dotenv가 최상단에서 로드).
3. POC_BASE_URL(메뉴 서버) 도달 확인 — iu2om과 별개 관문. Playwright는 iu2om이 아니라 mdev 웹서버에 접속해 메뉴를 띄웁니다. 툴이 mdev 자기 자신(혹은 그 도메인)에 HTTP로 닿는지 따로 확인해야 합니다:                                                                                                             
   curl -sI --connect-timeout 5 https://mdev.comet.duzon.net/ | head -3
3. (같은 머신이라 대개 되지만, mdev.comet.duzon.net DNS 해석이 서버 내부에서 되는지 / localhost로 바꿔야 하는지 확인 필요)
4. 로그인 세션 성립. 툴이 헤드리스로 로그인 플로우를 통과해야 함(계정 유효 + MFA/잠금 없어야 — 문서 130번 줄).




정리

- 네트워크 관점: 요청 6 승인 = iu2om 통신 3개(리스트·파일·결과) 가능. ✅ (단, 메뉴 서버 POC_BASE_URL 도달은 3번으로 별도 확인)
- 실행 관점: 승인만으로는 부족. 툴 본체·전체 node_modules 이관 + .env + 로그인까지 갖춰져야 run:all 배치가 실제로 돕니다.

즉 "요청 6이 열리면 run:all이 곧바로 돈다"가 아니라, "요청 6이 열리면 run:all을 돌리기 위한 마지막 큰 네트워크 관문이 사라진다" 가 정확합니다. 승인 나면 3번(POC_BASE_URL 도달)부터 같이 확인하고, 툴 본체 이관으로 이어가면 됩니다.                                                                              
                              


