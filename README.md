This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

# 🛒 Yammi - React Native Shopping Cart App

간단한 장바구니 기능이 포함된 React Native 앱입니다.  
회원/ 인증 없이도 상품 목록, 상세 페이지, 장바구니 담기/수량 변경/삭제, 합계 표시 기능을 제공합니다.  
AsyncStorage를 통해 앱 재실행 시에도 장바구니가 유지됩니다.

개인 프로젝트 jmini0102@gmail.com

프로젝트 기간 : 2025.09.17 ~ 2025.09.20

## 🚀 로컬 실행 방법

git clone https://github.com/username/yammi.git
cd yammi

- 패키지 설치
  npm install

- ios 빌드
  npx react-native run-ios

# 폴더 구조

Yammi/
├── App.tsx
├── src/
│ ├── action/ # Redux 액션
│ │ ├── action.tsx
│ │ └── redux.tsx
│ ├── data/
│ │ ├── data.tsx # Mock Data
│ │ └── symbol.png # 이미지
│ └── screen/ # 화면
│ ├── Cart.tsx # 장바구니 화면
│ ├── First.tsx # 홈 화면
│ ├── ProductDetail.tsx # 상품 정보 화면
│ └── ProductList.tsx # 상품 목록 화면
├── android/ # Android 빌드 관련 파일
├── ios/ # iOS 빌드 관련 파일
└── package.json

## 🛠️ 기술 스택

Framework: React Native
State Management: Redux Toolkit
Storage: AsyncStorage
Navigation: React Navigation
Icons: react-native-vector-icons
Build: Xcode (iOS), Gradle (Android)

상태관리: Redux
비동기: axios
스타일: StyleSheet
스토리지: @react-native-async-storage/async-storage (장바구니/재시작 복원용)
