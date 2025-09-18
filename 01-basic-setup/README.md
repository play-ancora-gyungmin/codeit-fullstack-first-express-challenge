# 01-basic-setup: Express 기본 설정 가이드

Express 프레임워크를 배우기 위한 기본 환경 설정을 단계별로 진행해보겠습니다. 각 체크박스를 완료하면 체크 표시를 해주세요!

## 🎯 학습 목표

- Express 프로젝트의 기본 구조 이해
- npm 패키지 관리 방법 학습
- 개발 환경 설정 (ESLint, Prettier)
- 기본적인 서버 파일 생성

## 📋 TODO 체크리스트

### 1단계: 프로젝트 초기 설정

- [ ] npm 프로젝트 초기화

  ```bash
  npm init -y
  ```

- [ ] Express 설치
  ```bash
  npm install express
  ```

### 2단계: 개발 도구 설치

- [ ] 코드 포매팅 및 린팅 도구 설치
  ```bash
  npm install -D prettier eslint @eslint/js
  ```

### 3단계: ESLint 설정

- [ ] `eslint.config.js` 파일 생성 및 설정

  ```javascript
  import js from "@eslint/js";

  export default [
    js.configs.recommended,
    {
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        globals: {
          console: "readonly",
          process: "readonly",
        },
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
        "prefer-const": "error",
        "no-var": "error",
        semi: ["error", "always"],
        quotes: ["error", "single"],
      },
    },
  ];
  ```

### 4단계: package.json 수정

- [ ] `package.json` 파일에서 `"main"` 항목을 `"src/server.js"`로 변경

- [ ] `"type": "module"` 추가 (ES6 import/export 문법 사용을 위해)

- [ ] `scripts` 섹션에 강의에서 배운 개발 스크립트들 추가:

  ```json
  "scripts": {
    "dev": "node src/server.js",
    "format": "prettier --write src/**/*.js",
    "format:check": "prettier --check src/**/*.js"
  }
  ```

- [ ] `keywords` 배열에 `"express"` 추가

- [ ] `author` 정보를 본인 정보로 수정:

  ```json
  "author": {
    "name": "your-name",
    "email": "your-email@example.com"
  }
  ```

- [ ] `description` 항목을 `적고 싶은 내용`을 추가

- [ ] `engines` 섹션 추가 (Node.js와 npm 버전 명시):
  ```json
  "engines": {
    "node": "^22.14.0",
    "npm": "^10.9.2"
  }
  ```

### 5단계: 서버 파일 생성

- [ ] `src` 폴더 생성

  ```bash
  mkdir src
  ```

- [ ] `src/server.js` 파일 생성 및 기본 코드 작성

  ```javascript
  console.log("hello world");
  ```

- [ ] 서버 실행 테스트
  ```bash
  npm run dev
  ```

## ✅ 완료 확인사항

설정이 모두 완료되면 다음을 확인해주세요:

- [ ] `node_modules` 폴더가 생성되었는가?
- [ ] `package-lock.json` 파일이 생성되었는가?
- [ ] `npm run dev` 실행 시 "hello world"가 콘솔에 출력되는가?
- [ ] 프로젝트 구조가 다음과 같은가?
  ```
  01-basic-setup/
  ├── node_modules/
  ├── src/
  │   └── server.js
  ├── eslint.config.js
  ├── package.json
  ├── package-lock.json
  └── README.md
  ```

## 🚀 다음 단계

기본 설정이 완료되면 Express 서버를 실제로 구현해보는 다음 단계로 넘어갈 수 있습니다!

---

### 💡 팁

- 터미널에서 `npm list` 명령으로 설치된 패키지를 확인할 수 있습니다
- `npm run format` 명령으로 코드 포매팅을 자동으로 할 수 있습니다
- 문제가 발생하면 `node --version`, `npm --version`으로 버전을 확인해보세요

### ❗ 주의사항

- Node.js 버전이 22.14.0 이상인지 확인하세요
- npm 버전이 10.9.2 이상인지 확인하세요
- `type: "module"`을 사용하므로 ES6 import/export 문법을 사용합니다
