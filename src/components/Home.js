import AuthService from "../services/auth.service";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <>
            <h3>Welcome{currentUser && (', ' + currentUser.username)}!</h3>
        </>
    );
};

export default Home;