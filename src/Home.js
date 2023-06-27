import Feed from './Feed'
const Home = ({posts, bools}) => {
    return (
        <main className="Home">
            {posts.length ? (
                <Feed posts={posts} />
            ):(
                <div style={{marginTop:'2rem'}}>{!bools ? (<div className="waiting"></div>): `No Posts Yet`}</div>
            )}
        </main>
    )
}

export default Home;