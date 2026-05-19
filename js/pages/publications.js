// publications.js – Dynamically load publication data

const publicationsData = [
  {
    id: 1,
    coverDate: "Jan-Mar 2025",
    volume: "Vol. xxxiv No. i",
    title: "Breakwater scores back 2 back as Best Magazine at PAWD Convention",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2025-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2025-1/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2025-1.pdf"
  },
  {
    id: 2,
    coverDate: "Apr-Jun 2025",
    volume: "Vol. xxxiv No. ii",
    title: "BCWD: 51 Years of Resiliency in Providing Potable Water to Butuan City",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2025-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2025-2-2GDl/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2025-2.pdf"
  },
  {
    id: 3,
    coverDate: "Jul-Sep 2025",
    volume: "Vol. xxxiv No. iii",
    title: "GUARDIANS OF THE TAGUIBO Multi-Sectoral Team Takes Action to Protect Butuan’s Lifeline",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2025-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2025-3/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2025-3.pdf"
  },
  {
    id: 4,
    coverDate: "Oct-Dec 2025",
    volume: "Vol. xxxiv No. iv",
    title: "CAPPING 2025 with Year-end Assessment and festive Fellowship Night of BCWD",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2025-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2025-4/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2025-4.pdf"
  },
  {
    id: 5,
    coverDate: "Jan-Mar 2024",
    volume: "Vol. xxxiii No. i",
    title: "BCWD Magazine Wins PAWD Best Publication",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2024-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2024-1/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2024-1.pdf"
  },
  {
    id: 6,
    coverDate: "Apr-Jun 2024",
    volume: "Vol. xxxiii No. ii",
    title: "LOOKING BACK as BCWD celebrates 50 years in water supply service",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2024-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/llqm/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2024-2.pdf"
  },
  {
    id: 7,
    coverDate: "Jul-Sep 2024",
    volume: "Vol. xxxiii No. iii",
    title: "PAWD in its 50 years of service to WD nationwide",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2024-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2024-3/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2024-3.pdf"
  },
  {
    id: 8,
    coverDate: "Oct-Dec 2024",
    volume: "Vol. xxxiii No. iv",
    title: "SIGNIFICANT STRIDES in water conservation",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2024-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/bfcf/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2024-4.pdf"
  },
  {
    id: 9,
    coverDate: "Jan-Mar 2023",
    volume: "Vol. xxxii No. i",
    title: "Water and Sanitation a Multi-Pronged Approach through Partnership with Stakeholders",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2023-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/gnkl/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2023-1.pdf"
  },
  {
    id: 10,
    coverDate: "Apr-Jun 2023",
    volume: "Vol. xxxii No. ii",
    title: "22nd Water Conciousness Week and BCWD 49 Year Anniversary Celebration",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2023-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/ylop/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2023-3.pdf"
  },
  {
    id: 11,
    coverDate: "Jul-Sep 2023",
    volume: "Vol. xxxii No. iii",
    title: "BCWD Announces the Appointment of a New General Manager",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2023-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/vmxe/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2023-3.pdf"
  },
  {
    id: 12,
    coverDate: "Oct-Dec 2023",
    volume: "Vol. xxxii No. iv",
    title: "Water For Free: BCWD Sets up Drinking Water Stations for Voting Centers",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2023-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/cxxp/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2023-4.pdf"
  },
  {
    id: 13,
    coverDate: "Jan-Mar 2022",
    volume: "Vol. xxiii No. i",
    title: "BCWD for Environmental Protection Conducts the 1st Quarter Watershed Community Symposium",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2022-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/djsq/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2022-1.pdf"
  },
  {
    id: 14,
    coverDate: "Apr-Jun 2022",
    volume: "Vol. xxiv No. ii",
    title: "Water Governance Towards Building a Better Normal",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2022-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/hmfc/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2022-2.pdf"
  },
  {
    id: 15,
    coverDate: "Jul-Sep 2022",
    volume: "Vol. xxiii No. iii",
    title: "BCWD Joins PAWD in a Pre-Kick Off Anniversary Project",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2022-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/quqq/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2022-3.pdf"
  },
  {
    id: 16,
    coverDate: "Oct-Dec 2022",
    volume: "Vol. xxiii No. iv",
    title: "One Meralco Foundation partners with BCWD for One for Trees Program",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2022-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2022-4/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2022-4.pdf"
  },
  {
    id: 17,
    coverDate: "Jan-Mar 2021",
    volume: "Vol. xxvii No. i",
    title: "Celebrating the Watershed Consciousness Week",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2021-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/smyp/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2021-1.pdf"
  },
  {
    id: 18,
    coverDate: "Apr-Jun 2021",
    volume: "Vol. xxvii No. ii",
    title: "BCWD Declares Winners for Its 1st Digital Contests",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2021-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/coso/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2021-2.pdf"
  },
  {
    id: 19,
    coverDate: "Jul-Sep 2021",
    volume: "Vol. xxvii No. iii",
    title: "BCWD Upgrading its Transmission Pipeline Crossing Magsaysay Bridge",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2021-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/pegz/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2021-3.pdf"
  },
  {
    id: 20,
    coverDate: "Oct-Dec 2021",
    volume: "Vol. xxvii No. iv",
    title: "Water Supply Status After Severe Tropical Storm Odette",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2021-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/ycyv/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2021-4.pdf"
  },
  {
    id: 21,
    coverDate: "Jan-Mar 2020",
    volume: "Vol. xxvi No. i",
    title: "BCWD Adapting During the Time of COVID-19 Through Focusing on the Fundamentals and Looking to the Long-term",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2020-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/ulcc/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2020-1.pdf"
  },
  {
    id: 22,
    coverDate: "Apr-Jun 2020",
    volume: "Vol. xxvi No. ii",
    title: "BCWD Must Operate in Full Capacity During ECQ and GCQ",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2020-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/limo/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2020-2.pdf"
  },
  {
    id: 23,
    coverDate: "Jul-Sep 2020",
    volume: "Vol. xxvi No. iii",
    title: "BCWD Donates School Supplies to Various Schools for Brigada Eskwela",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2020-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/gmlt/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2020-3.pdf"
  },
  {
    id: 24,
    coverDate: "Oct-Dec 2020",
    volume: "Vol. xxvi No. iv",
    title: "Quadrapartite MOA for Watersheds Signed",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2020-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/jzbg/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2020-4.pdf"
  },
  {
    id: 25,
    coverDate: "Jan-Mar 2019",
    volume: "Vol. xxv No. i",
    title: "BCWD Sets Activities for Milestone Anniversary Celebration at 45",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2019-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/zxqw/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2019-1.pdf"
  },
  {
    id: 26,
    coverDate: "Apr-Jun 2019",
    volume: "Vol. xxv No. ii",
    title: "BCWD Wins 1st Runner-up in the Balangay Festival",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2019-2_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/xqav/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2019-2.pdf"
  },
  {
    id: 27,
    coverDate: "Jul-Sep 2019",
    volume: "Vol. xxv No. iii",
    title: "BCWD and ANECO sign MOA for Adopt-a-Forest Program",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2019-3_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/hvho/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2019-3.pdf"
  },
  {
    id: 28,
    coverDate: "Oct-Dec 2019",
    volume: "Vol. xxv No. iv",
    title: "11 Students vie for the top prize of BCWD's 32nd Oratorical Contest",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2019-4_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/breakwater-2019-4/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2019-4.pdf"
  },
  {
    id: 29,
    coverDate: "Jan-Mar 2018",
    volume: "Vol. xxiv No. i",
    title: "BCWD Named 2018 Huwarang Lingkod Tubig Awardee for Mindanao",
    imgSrc: "https://mail.bcwd.gov.ph/publications/images/breakwater 2018-1_cover.jpg",
    customViewUrl: "https://online.fliphtml5.com/qnjly/getm/",
    pdfUrl: "https://mail.bcwd.gov.ph/publications/pdf/breakwater 2018-1.pdf"
  }
];

function renderPublications() {
  const grid = document.getElementById('publications-grid');
  if (!grid) return;

  publicationsData.forEach(pub => {
    const article = document.createElement('article');
    article.className = 'pub-card';

    article.innerHTML = `
      <a href="${pub.pdfUrl}" class="pub-card__cover" target="_blank" aria-label="View ${pub.coverDate} issue cover">
        <img src="${pub.imgSrc}" alt="Breakwater ${pub.coverDate} cover" />
      </a>
      <div class="pub-card__content">
        <div class="pub-card__volume">${pub.volume}</div>
        <h3 class="pub-card__title">${pub.title}</h3>
        <div class="pub-card__date">${pub.coverDate}</div>
        <div class="pub-card__actions">
          <a href="${pub.pdfUrl}" class="pdf-link" target="_blank" aria-label="Download PDF for ${pub.coverDate} issue">PDF View</a>
        </div>
      </div>
    `;

    grid.appendChild(article);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPublications);
} else {
  renderPublications();
}