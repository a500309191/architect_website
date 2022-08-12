import { Summary } from './Summary';
import { WebsiteInfo } from './WebsiteInfo';
import { useState } from 'react';


export const InfoBlock = () => {

    const [tumbler, setTumbler] = useState(true)
    const block = tumbler => tumbler ? <Summary /> : <WebsiteInfo />

    return (
        <div className="info-block">
            <div className="info-block-headers">
                <div
                    className={`${tumbler
                        ? "info-block-header-active"
                        : "info-block-header"}`}
                    onClick={() => setTumbler(true)}
                >
                    SUMMARY
                </div>
                <div
                    className="website-info-header"
                    className={`${tumbler
                        ? "info-block-header"
                        : "info-block-header-active"}`}
                    onClick={() => setTumbler(false)}
                >
                    WEBSITE
                </div>
            </div>
            <div className="info-content">
                { tumbler ? <Summary /> : <WebsiteInfo /> }
            </div>
        </div>
    )
}