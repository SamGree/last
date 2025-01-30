// import useHttpRequest from '../../hooks/http-request-hook';
// import useAuthStore from './auth-store';

export default function LikedPosts () {
    // const { token } = useAuthStore();
    const token = JSON.parse(localStorage.getItem("post-storage")) || null
    console.log(token)


        const LikedPost = async () => {
          try {
            const data = await fetch('https://samgree-epics-fgd5nk4tk9n.ws.codeinstitute-ide.net/post-like/', 'GET', {
              headers: { Authorization: `Token ${token}` },
            });
            console.log("liked Posts ..= " ,data)
            return data;
    
          } catch (error) {
            console.error(error);

          }
        };
    
        return LikedPost();

}