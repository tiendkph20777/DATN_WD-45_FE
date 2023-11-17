import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDlf-p6JnPqv6AOv7qiy1qDbJPtWbztWIU",
	authDomain: "datn-404316.firebaseapp.com",
	projectId: "datn-404316",
	storageBucket: "datn-404316.appspot.com",
	messagingSenderId: "58049053843",
	appId: "1:58049053843:web:154ee388e98fee46847966",
	measurementId: "G-M6W6K5CC4K"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Thêm sự kiện lắng nghe khi đăng nhập thành công
auth.onAuthStateChanged((user: any) => {
	if (user) {
		console.log('User logged in:', user?.multiFactor?.user);
		// Bạn có thể thực hiện các thao tác khác với user ở đây
	} else {
		console.log('User logged out');
	}
});

export { firebase };
