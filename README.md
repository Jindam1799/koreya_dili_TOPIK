# 덩어리숲 · Koreya Dili Söz Meşəsi

아제르바이잔 친구들을 위한 한국어 단어 게임. © 2026 Wonju (원주)
Azərbaycanlı dostlar üçün Koreya dili söz oyunu.

▶ https://jindam1799.github.io/koreya_dili_TOPIK/

튀르키예 버전(https://jindam1799.github.io/korece_Turkce_TOPIK/)과 같은 프로그램이에요. 화면·팝업은 아제르바이잔어, 배경은 바쿠(불꽃 타워·처녀의 탑·카스피해)예요.

## 내용
| 단계 | 단어 수 | 파일 |
|---|---|---|
| A1–A2 | 1000 | `data/a12.js` |
| B1–B2 | 2000 | `data/b11.js` `b12.js` `b21.js` `b22.js` |
| TOPIK Ⅰ | 2000 | `data/topik1.js` (`tools/build_topik1.py`) |
| TOPIK Ⅱ | 3500 | `data/topik2.js` (bölmə 54–66: 3–4 səviyyə əlavə siyahı, `tools/az/topik2_34.txt`; mövzu bölmələri: `tools/az/topik2_topics.txt`) |
| 한자 (Hanca) | 400 | `data/hanja.js` |

- **단어 뜻은 아직 튀르키예어예요.** 아제르바이잔어 검수자가 검수 모드에서 고쳐 나가면 돼요.
- 단어 자료: Aslıhan Erdoğan
- 식물 친구 그림: `char.js`

## 튀르키예 버전과 다른 점
- 저장 이름: `deongeoriForestAZ`, `deongeoriReviewAZ` (같은 github.io 주소라서 진도가 섞이지 않게 분리)
- 오프라인 저장: `sw.js`의 `VERSION`은 `deongeori-az-vN` 형식. 다른 버전의 저장 파일은 지우지 않아요.
- 화면 언어 코드: `az` (`app.js`의 `TX.az`)

## 고치는 법
- 단어: `data/*.js` 한 줄 = `단어|뜻|짝꿍어휘=뜻;짝꿍어휘=뜻`, `#`으로 시작하는 줄은 단원 이름
- 연락처: `config.js`
- 업데이트 노트: `app.js`의 `NOTES` 목록 맨 위에 추가
- 새 버전을 올릴 때 `index.html`의 `?v=N`과 `sw.js`의 `VERSION`을 올려요

## 단어 검수 (아제르바이잔어)
1. 검수용 링크: https://jindam1799.github.io/koreya_dili_TOPIK/#kontrol
2. 단어마다 ✓ 맞음 / 뜻·짝꿍어휘를 아제르바이잔어로 고치고 ✓ 저장 / 🗑 빼기
3. 작업은 휴대폰에 자동 저장돼요. 다 하면 '보내기' → 파일 전달
4. 반영: `python3 tools/merge_review.py 받은파일.json`
