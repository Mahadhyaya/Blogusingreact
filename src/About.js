const About = ({names}) => {
    return (
        <main className="About">
            <h1>{names}</h1>
            <p style={{marginTop:'1rem'}}>This Is a Simple Blog For My React Project</p>
        </main>
    )
}

About.defaultProps = {
    names:"Soorya"
}

export default About;