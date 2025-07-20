export default function Facebook() {
    return (
        <svg
        className="fill-current h-8 w-8"
        height="25"
        viewBox="0 0 25 25"
        width="25"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            id="y9rw9vl78a"
            d="M25 1.378v22.238c0 .765-.62 1.378-1.378 1.378h-6.373v-9.676h3.248l.485-3.772h-3.739V9.135c0-1.094.302-1.836 1.87-1.836h1.997V3.923c-.345-.045-1.529-.15-2.912-.15-2.88 0-4.855 1.757-4.855 4.988v2.785h-3.26v3.772h3.26V25H1.378C.62 25 0 24.38 0 23.622V1.378C0 .62.62 0 1.378 0h22.238C24.381 0 25 .62 25 1.378z"
          />
          <path id="29f5v57kad" d="M0 0H25V25H0z" />
          <filter
            id="24lqqvv0ec"
            filterUnits="objectBoundingBox"
            height="260%"
            width="260%"
            x="-80%"
            y="-96%"
          >
            <feOffset
              dy="-4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="6"
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0.707937047 0 0 0 0 0.707937047 0 0 0 0 0.707937047 0 0 0 0.5 0"
            />
          </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g>
            <g>
              <g
                transform="translate(-1223 -3833) translate(0 3759) translate(1223 74)"
              >
                <mask id="4kflxjlbxb" fill="#fff">
                  <use xlinkHref="#y9rw9vl78a" />
                </mask>
                <g mask="url(#4kflxjlbxb)">
                  <g>
                    <use
                      fill="#000"
                      filter="url(#24lqqvv0ec)"
                      xlinkHref="#29f5v57kad"
                    />
                    <use fill="#572B7B" xlinkHref="#29f5v57kad" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
}