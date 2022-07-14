export const SummaryBlock = () => {
    return (
        <div className="summary-block">
            <div className="summary-header">SUMMARY</div>
            <div className="summary-content">
            <div>Welcome.</div>
            <div>
                My name is Valery. I am aspiring to be a &nbsp;
                    <strong>full-stack developer</strong>.<br />
                If you are here, then most likely I am interested in you as a potential employer,
                and you are interested in me as a potential employee.
            </div>
            <div className="about-myself">
                <div className="about-myself-header">Shortly about myself:</div>
                <div className="about-myself-list">
                    <div>1993 year of birth</div>
                    <div>Live in Moscow</div>
                    <div>In 2018 graduated with a master degree of architecture</div>
                    <div>I have been working as an architect for 4 years</div>
                    <div>English is intermediate+ &nbsp;
                        <strong>(fluent reading of technical documentation)</strong>
                    </div>
                    <div>1 october 2021 I started learning programming on my own &nbsp;
                        <strong>(python, sql, javascript)</strong>
                    </div>
                    <div>I learn programming mainly by reading books and doing exercises</div>
                </div>
            </div>

            <div>
                This site is a demonstration of my knowledge and skills, which I acquired during the period of self-study.<br />
                As a portfolio, I chose a site-portfolio of my architectural works, namely individual residential buildings.
                All houses are designed by me in the last 2 years
                The site was developed using <strong>django, react, postgresql</strong> technologies.<br />
                No one except me participated in the development, this is a product of a completely single author.<br />
            </div>
            <div>
                <a className="link-to" href="https://github.com/a500309191/architect_website">
                    <strong>link to github repository</strong>
                </a><br />
            </div>
            <div>
                I hope my portfolio is able to convince you to contact me to discuss the details of further cooperation.<br />
                Thank you for your attention.
            </div>
            </div>
        </div>
    )
}