export const WebsiteInfo = () => {
    return (
        <>
            <div>
                This website is a demonstration of my knowledge and skills, which I acquired during the period of self-study.<br />
            </div>
            <div>
                As a portfolio, I chose a site-portfolio of my architectural works, namely individual residential buildings.<br />
                All houses are designed by me in the last 2 years<br />
            <div>
            </div>
                The website was developed using
                <a className="red-link-to" href="https://www.djangoproject.com/">
                    <strong>DJANGO</strong>
                </a>,
                <a className="red-link-to" href="https://reactjs.org/">
                    <strong>REACT</strong>
                </a>,
                <a className="red-link-to" href="https://www.postgresql.org/">
                    <strong>POSTGRESQL</strong>
                </a>
                &nbsp;technologies.<br />
                Deployed on&nbsp;
                <a className="red-link-to" href="https://heroku.com/"><strong>heroku</strong></a>.<br />
                As a bridge between django and react used&nbsp;
                <a className="red-link-to" href="https://www.django-rest-framework.org/">
                    <strong>django rest framework</strong>
                </a>.&nbsp;
                <a className="red-link-to" href="https://a500-arch.herokuapp.com/arch/api/houses/">
                    <strong>API LINK</strong>
                </a><br />
                As a storage of media files used <a className="red-link-to" href="https://cloudinary.com/"><strong>cloudinary</strong></a>.<br />
            <div>
            </div>
                Each house has a name generated by weak random name generator when automatically added to the site by script<br />
                which was written by myself.&nbsp;
                <a className="red-link-to" href="https://github.com/a500309191/architect_website/tree/main/arch/startContentFiller">
                    <strong>link to folder on github</strong>
                </a>
            </div>
            <div>
                <main>website has two versions:</main>
            </div>
            <div className="content-info-list">
                <div>
                    1. without access to the admin panel and database filled with houses:<br />
                    <a className="red-link-to" href="https://a500-arch.herokuapp.com/">a500-arch.herokuapp.com</a><br />
                </div>
                <div>
                    2. with access to the admin panel and an empty database at the start:<br />
                    <a className="red-link-to" href="https://a500-arch-sandbox.herokuapp.com/">a500-arch-sandbox.herokuapp.com</a><br />
                </div>
            </div>
            <div>
                <a className="red-link-to" href="https://a500-arch-sandbox.herokuapp.com/admin/"><strong>ADMIN PANEL LINK</strong></a><br />
                <main>
                    login: admin<br />
                    password: admin<br />
                </main>
            </div>
            <div style={{ marginTop: 10 }}>
                No one except me participated in the development, this is a product of a completely single author.<br />
            </div>
            <div>
                <a className="red-link-to" href="https://github.com/a500309191/architect_website">
                    <strong>link to github repository</strong>
                </a><br />
            </div>
        </>
    )
}