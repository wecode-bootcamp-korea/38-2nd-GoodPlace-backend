<div align="center"><img width="300" height="200" alt="어떤데  배너" src="https://user-images.githubusercontent.com/101626477/202843748-5c2eb570-b9af-4137-a58e-d404919ab74b.png"></div>

국내 숙박/휴가/레저/여행을 한 번에 예약할 수 있는 플랫폼 <b>여기어때</b>를 모티브로 한 숙박 중개 플랫폼
### 선정이유
- 모티브 하게 된 여기어때 페이지에서 이용되는 소셜 로그인 및 지도 기능
- 대실 및 숙박과 같은 여러 가지 예약에 차이를 두는 기능
- 현재 위치를 기반으로 이용자에게 가장 가깝거나 값이 저렴한 상품들을 보여주는 기능

## 🗓 Project기간
<span>2022. 10. 31. ~ 2022. 11. 10. (약 2주)</span>

## 👥 인원 및 구성
### Front-End
|👑 최현|김솔|모유진|
| :--: | :--: | :--: |
|<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/108847541?v=4" alt="avatar" />               |<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/106805946?v=4" alt="avatar" />                |<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/101626477?v=4" alt="avatar" />               |
| [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/choigus98) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/solrasido55) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/yuzinnee) |

### Back-End
| 이현태|정해만|정재욱|
| :--: | :--: | :--: |
|<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/50650892?v=4" alt="avatar" />               |<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/107095457?v=4" alt="avatar" />                |<img width="95px" height="95px" src="https://avatars.githubusercontent.com/u/35396255?v=4" alt="avatar" />               |
| [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/iflov) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/haemong) | [<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>](https://github.com/dnrdls7) |

## 💻 기술 스택

### Front-End

|JavaScript|React|Styled <br/> Components|esLint|Prettier|
| :--: | :--: | :--: | :--: | :--: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://styled-components.com/logo.png" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /> |

### Back-End

|JavaScript|Nodejs|MySql|Rest|
| :--: | :--: | :--: | :--: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /> |

# 구현 내용 및 설명

||시연영상|담당 개발자|설명|
| :--: | :--: | :--: | :--: |
| Nav SearchModal |![goodplace-Nav:Search](https://user-images.githubusercontent.com/108847541/202904388-750034f2-8472-462c-a696-aa1c90c41673.gif)| FE<br>`최현`<br>BE<br>`정재욱` | - debounce를 이용한 불필요한 통신을 줄인 검색기능 <br>- 스크롤 이벤트를 감지하여 스크롤에 맞춰 색상을 Styled-Components에서 props값으로 관리 |
| Footer |![goodplace-footer](https://user-images.githubusercontent.com/108847541/202905287-300ed995-cc33-4d1e-a1d4-d27f29e13316.gif)| FE<br>`모유진` | - Styled-Components와 시멘틱 태그를 이용한 Footer제작 |
| 카카오API 로그인 및 회원가입 | ![goodplace-signin:signup](https://user-images.githubusercontent.com/108847541/202905404-439f68e2-6e45-423e-bf58-f1394d067de3.gif)| FE<br>`최현`<br>BE<br>`정재욱` | - 카카오 API를 이용한 로그인 및 회원가입 기능<br> - 카카오API를 통해 받아온 정보와 추가로 입력한 정보를 이용하여 회원가입 |
| 리스트 페이지<br>Sort | ![goodplace-filter:sort](https://user-images.githubusercontent.com/108847541/202957655-c8dc3e29-aa1c-423b-be47-c1e01e42c47e.gif) | FE<br>`김 솔`<br>BE<br>`정해만` | - GET요청을 쿼리에 조건을 담아서 요청하여 Sort된 데이터를 받아오는 형식 |
| 리스트 페이지<br>AddressFilter |![goodplace-addressFilter](https://user-images.githubusercontent.com/108847541/202960192-c9ddd7c0-ff28-472b-810a-9833b7db2715.gif) | FE<br>`김 솔`<br>BE<br>`정해만` | - GET요청을 쿼리에 조건을 담아서 요청하여 Filter된 데이터를 받아오는 형식 |
| 리스트 페이지<br>RangeFilter |![goodplace-rangeFilter](https://user-images.githubusercontent.com/108847541/202960460-21738e66-e998-4f3c-a186-c6733f9ce218.gif) | FE<br>`김 솔`<br>BE<br>`정재욱` | - GET요청을 쿼리에 조건을 담아서 요청하여 Filter된 데이터를 받아오는 형식<br> - 카카오MAP을 이용하여 현재 위치에서 각각의 아이템들까지의 직선상의 거리를 계산하여 거리순으로 filter |
| 리스트 페이지<br>현재위치 변경 | ![goodplace-kakaoMap:nearBy](https://user-images.githubusercontent.com/108847541/202960721-79b333e4-2233-410b-9693-bc984b8bd492.gif) | FE<br>`김 솔` | - 카카오MAP에서 변경한 위치를 현재 위치로 설정되게끔 기능 구현 |
| 리스트 페이지 <br> 무한 스크롤 | ![goodplace-infiniteScroll](https://user-images.githubusercontent.com/108847541/202960867-5682f9c3-b5dd-4820-81f8-682fbe9ad0e3.gif) | FE<br>`김 솔`<br>BE<br>`정해만` | - offset과 limit를 쿼리로 받아 무한 스크롤 기능 구현 |
| 디테일 페이지 <br> 캐러셀 슬라이드 <br> 메뉴탭 <br> 아코디언 메뉴탭 | ![goodplace-detail](https://user-images.githubusercontent.com/108847541/202962635-6ade7edb-c05a-4cbf-94b4-a984314a39a1.gif) | FE<br>`최 현`<br>BE<br>`정해만` | - SwiperSlide/카카오MAP을 이용하여 기능 구현<br> - 아코디언메뉴를 시맨틱태그를 이용하여 구현<br> - 룸 이미지에서 사용된 캐러셀에서는 썸네일 이미지에 마우스가 올라가면 데이터를 받아오게끔 구현 |
| 디테일 페이지 <br> 리뷰 작성 | ![goodplace-detail:review](https://user-images.githubusercontent.com/108847541/202965063-dc8ab18c-ab9f-40bf-857a-23ed8c0c3cc1.gif) | FE<br>`김 솔`<br>`최 현`<br>BE<br>`이현태` | - FORMDATA를 이용한 사진과 코멘트 리뷰 기능 구현
| 예약 페이지 <br> 대실 예약 | ![goodplace-timeOrder](https://user-images.githubusercontent.com/108847541/202963771-7496a939-c4f6-4565-9f4c-84fa6d57debd.gif) | FE<br>`김 솔`<br>`최 현`<br>BE<br>`이현태` | - 플랫폼 규정에 의한 최대 이용시간 4시간까지 설정되게끔 구현<br> - 지정한 날짜/시간/숙소/방을 body에 담아 post요청 |
| 예약 페이지 <br> 숙박 예약 | ![goodplace-stayOrder](https://user-images.githubusercontent.com/108847541/202964538-a8fd212f-946d-4f0f-90dd-9145d38d0ed5.gif) | FE<br>`김 솔`<br>`최 현`<br>BE<br>`이현태` | - 지정한 체크인·체크아웃날짜/숙소/방을 body에 담아 post요청  |
| 예약 내역 페이지<br> 예약 내역 조회<br>예약 내역 삭제<br>예약 내역 상세 | ![goodplace-orderList](https://user-images.githubusercontent.com/108847541/202964694-ea441049-fbf0-4301-89cb-0d02a6c274dd.gif) | FE<br>`모유진`<br>BE<br>`이현태` | - 예약한 데이터 조회<br> - 예약 내역 클릭 시 예약 상세 페이지 데이터 로드 |


