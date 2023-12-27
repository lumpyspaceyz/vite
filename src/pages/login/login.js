import '/src/pages/login/login.css'
import { getNode, tiger, getStorage, setStorage, setDocumentTitle } from "/src/lib";
import pb from '/src/api/pocketbase'
import gsap from "gsap"

// const pb = new PocketBase(import.meta.env.VITE_PB_URL)

setDocumentTitle('2.9CM 로그인')

const loginButton = getNode('.login');

const tl = gsap.timeline({
  defaults: {
    opacity: 0
  }
});

tl.from('.container > h1', {y: 30})
  .from('.container hr', {scaleX: 0}, '<')
  .from('form > *', {y: 30, stagger: 0.1})
  .from('.register', {y: -30}, '-=0.2')


tl.eventCallback('onUpdate',(e)=>{
  console.log('애니메이션 진행중');
})


async function handleLogin(e) {
  e.preventDefault();

  try {
    const id = getNode('#idField').value
    const pw = getNode('#pwField').value

    const userData = await pb
    .collection('users')
    .authWithPassword(id, pw)

    const {model, token} = await getStorage('pocketbase_auth');
    setStorage('auth', {
      isAuth: !!model,
      user: model,
      token: token,
    })

    alert('로그인 완료! 메인페이지로 이동합니다.')
    window.location.href = '/index.html'

  }
  catch {
    alert('인증된 사용자가 아닙니다.')
  }

}

loginButton.addEventListener('click', handleLogin);