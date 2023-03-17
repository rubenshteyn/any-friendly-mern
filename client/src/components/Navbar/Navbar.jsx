import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss'
import {AuthContext} from "../../context/AuthContext";
function Navbar() {
    const {logout, isLogin} = useContext(AuthContext)
    return (
        <nav>
            <div className="nav-wrapper navbar green">
                <Link to="/" className="brand-logo">
                    <svg viewBox="0 0 210 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_12_55)">
                            <g filter="url(#filter1_i_12_55)">
                                <path d="M92.4444 126.157C97.962 124.463 102.479 119.443 104.886 112.347C106.019 109.008 106.639 104.914 106.458 101.971C106.108 96.1561 103.652 91.7312 99.7856 89.9137C98.4742 89.3014 97.1471 89.0208 95.864 89.0999C94.8405 89.163 93.9303 89.4081 92.879 89.8982C86.5398 92.8645 81.9279 99.7257 80.5995 108.173C80.3693 109.66 80.2715 112.533 80.396 114.25C80.5798 116.807 80.8738 118.159 81.6222 119.885C82.7965 122.593 84.5321 124.542 86.7216 125.589C88.0467 126.232 89.1553 126.463 90.6802 126.424C91.5422 126.394 91.7721 126.364 92.4444 126.157Z" fill="white"/>
                            </g>
                            <g filter="url(#filter2_i_12_55)">
                                <path d="M127.616 123.667C130.76 122.89 133.717 120.266 135.613 116.566C137.392 113.101 138.058 108.341 137.453 103.424C136.683 97.1547 133.812 92.0071 129.512 89.2001C128.567 88.581 126.987 87.8513 125.905 87.5399C125.139 87.3194 124.941 87.3 124.08 87.3137C122.937 87.3369 122.114 87.4978 121.098 87.8913C119.523 88.5003 118.217 89.3842 116.968 90.69C114.492 93.2764 112.852 97.0401 112.303 101.398C112.082 103.192 112.109 105.837 112.385 107.891C113.366 115.329 117.02 120.996 122.177 123.065C124.187 123.87 125.983 124.067 127.616 123.667Z" fill="white"/>
                            </g>
                            <g filter="url(#filter3_i_12_55)">
                                <path d="M71.0772 98.4094C76.1664 97.2373 80.7899 93.3527 83.7987 87.7009C85.2276 85.0214 86.021 82.7356 86.6717 79.4424C86.903 78.2546 86.9545 77.8103 87.018 76.4674C87.0956 74.8242 87.0425 74.0162 86.7768 72.7093C86.0668 69.2007 84.1341 66.4291 81.621 65.3001C80.2489 64.6836 78.9781 64.502 77.5282 64.7253C74.0075 65.2573 70.8064 67.085 67.8858 70.2266C64.6681 73.6937 62.3457 78.358 61.4331 83.1639C61.2011 84.3676 60.9687 86.7055 60.977 87.658C61.0269 92.5621 63.3741 96.7181 66.8509 98.0792C68.197 98.6027 69.6992 98.7228 71.0772 98.4094Z" fill="white"/>
                            </g>
                            <g filter="url(#filter4_i_12_55)">
                                <path d="M150.241 91.4672C153.591 90.6858 156.5 88.112 157.681 84.8728C158.101 83.7285 158.482 82.106 158.681 80.6366C159.405 75.3067 157.891 69.4689 154.702 65.2467C154 64.3211 152.598 62.8795 151.694 62.179C149.609 60.5352 147.05 59.4248 144.628 59.0936C143.985 59.0072 142.449 59.1176 141.824 59.2979C139.053 60.0831 136.645 62.2006 135.197 65.1333C134.304 66.937 133.786 69.198 133.662 71.8285C133.585 73.448 133.62 74.328 133.824 75.812C134.597 81.5301 137.74 86.7319 142.172 89.633C143.383 90.4327 145.118 91.2552 146.075 91.4877C147.272 91.7762 148.955 91.767 150.241 91.4672Z" fill="white"/>
                            </g>
                            <g clip-path="url(#clip0_12_55)">
                                <g filter="url(#filter5_i_12_55)">
                                    <path d="M94.9804 24.0313C94.8652 24.0417 94.4919 24.0886 94.1508 24.1356C87.3058 25.0325 81.687 30.8883 80.318 38.5484C79.705 41.9899 80.0092 46.4066 81.1062 50.1401C82.2678 54.0666 84.2176 57.4977 87.5455 61.4659C89.1219 63.3431 90.4679 64.7511 94.8652 69.1312C95.93 70.1897 97.1146 71.3734 97.4926 71.7645C102.213 76.5618 105.49 80.5874 108.306 85.0458L108.905 86H109.514L110.122 85.9948L110.721 84.9936C113.289 80.7073 116.308 76.859 120.793 72.1608C121.673 71.2326 122.674 70.2158 125.527 67.3479C129.933 62.9051 132.187 60.3448 134.013 57.7011C136.976 53.3992 138.475 49.3423 138.917 44.3886C139.005 43.3665 138.995 40.9209 138.894 40.0345C138.41 35.8368 136.861 32.2284 134.294 29.324C131.726 26.4195 128.532 24.6622 124.826 24.1199C123.937 23.9948 122.001 23.9948 121.093 24.1199C117.714 24.6049 114.736 26.1379 112.243 28.6774C111.362 29.5743 110.371 30.8518 109.777 31.8582C109.638 32.0928 109.514 32.2858 109.5 32.2858C109.486 32.2858 109.362 32.0928 109.223 31.8582C108.629 30.8518 107.638 29.5743 106.757 28.6774C104.31 26.1849 101.364 24.6466 98.101 24.1564C97.428 24.0521 95.5105 23.9791 94.9804 24.0313Z" fill="#FF0000"/>
                                </g>
                            </g>
                            <path d="M20.875 22.25H39.5L59.25 129H42.875L39.9375 109.875H20.4375L17.625 129H1.1875L20.875 22.25ZM38.0625 97.6875L30.5625 44.5H29.875L22.3125 97.6875H38.0625Z" fill="white"/>
                            <path d="M167.125 22.25H207.938V35H183.312V66.9375H202.625V79.6875H183.312V129H167.125V22.25Z" fill="white"/>
                        </g>
                        <defs>
                            <filter id="filter0_i_12_55" x="1.1875" y="22.25" width="206.75" height="110.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <filter id="filter1_i_12_55" x="80.3416" y="89.0868" width="26.1474" height="41.3411" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <filter id="filter2_i_12_55" x="112.155" y="87.3103" width="25.5161" height="40.5573" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <filter id="filter3_i_12_55" x="60.9768" y="64.6336" width="26.0739" height="37.9472" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <filter id="filter4_i_12_55" x="133.624" y="59.0636" width="25.2351" height="36.6346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <filter id="filter5_i_12_55" x="80.0059" y="24.014" width="58.9709" height="65.986" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12_55"/>
                            </filter>
                            <clipPath id="clip0_12_55">
                                <rect width="59" height="62" fill="white" transform="translate(80 24)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
                {
                    isLogin
                        ?<ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/catalog">Каталог</Link></li>
                                <li><Link to="/favorites">Избранные</Link></li>
                                <li><Link onClick={logout} to="/login">Выйти</Link></li>
                            </ul>
                        :<ul id="nav-mobile" className="right hide-on-med-and-down"><li><Link to="/login">Войти</Link></li></ul>
                }
            </div>
        </nav>
    );
}

export default Navbar;