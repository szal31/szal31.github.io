/* ==========================================================
   YOUR CONTENT — edit the text between the quotes.
   Tips:
   • Wrap a word in *stars* to make it italic + accent color.
   • Keep the commas at the end of lines.
   • Remove a section by deleting its name from "sections".
   • Images: put files in assets/images/ and write the path,
     e.g. image: "assets/images/project-1.jpg". Leave it ""
     to show a colored placeholder instead.
   ========================================================== */
window.SITE = {
  meta: {
    title: "Sanad Mifzal — Aspiring Data Scientist",
    description: "Sanad Mifzal is a Mathematics (Big Data Analytics) student at UiTM Shah Alam and a First Class student, focused on machine learning and predictive analysis. Available for a 16-week internship from March 2027.",
    lang: "en"
  },

  person: {
    name: "Sanad Mifzal",
    location: "Shah Alam, Selangor",
    timezone: "Asia/Kuala_Lumpur",      // shows your local time; "" to hide
    available: true,                    // green "available" badge
    availableText: "Open to a 16-week internship from March 2027",
    role: "Aspiring Data Scientist",      // shown on the ID badge
    org: "UiTM · Big Data Analytics"      // shown on the ID badge
  },

  // Motion and effects. Set any to false to turn it off.
  effects: {
    dataNetwork: true,   // animated dots-and-lines background behind the headline
    lanyard: true,       // About photo as a swinging ID badge: drag it, tap to flip
    progressBar: true,   // thin reading-progress bar at the top
    countUp: true        // stat numbers count up when they scroll into view
  },

  // Order of sections on the page. Delete one to hide it.
  // "experience" is hidden; add it back to show the Journey timeline.
  sections: ["hero", "work", "about", "achievements", "skills", "contact"],

  hero: {
    headline: ["Turning raw *data*", "into clear decisions."],
    intro: "Hi there, I'm a Mathematics student specialising in Big Data Analytics. My expertise is machine learning and predictive analysis: finding the patterns in data and turning them into models people can trust.",
    buttons: [
      { label: "See my projects", href: "#work" },
      { label: "Get in touch", href: "#contact" }
    ]
  },

  // Scrolling strip under the hero. [] to hide.
  marquee: ["Machine Learning", "Predictive Analysis", "Python", "SQL", "Computer Vision", "Power BI", "Statistics"],

  work: {
    title: "Selected *projects*",
    nav: "Projects",
    intro: "Machine learning and analytics work from my degree. Click any one for the details.",
    projects: [
      {
        title: "Damaged License Plate Classification",
        category: ["Machine Learning", "Computer Vision"], // used by the filter buttons
        featured: true, // shown as the big card at the top
        year: "2026 · In progress",
        role: "Final Year Project",
        summary: "Computer vision pipeline that spots damaged plates",
        description: "A machine learning pipeline on 1,000 Kaggle license plate images (500 normal, 500 degraded with synthetic blur, blockage and noise). It combines HOG and LBP feature extraction to classify each plate as damaged or normal.",
        results: ["Comparing SVM, Random Forest and KNN to find the best model", "Balanced dataset of 500 normal and 500 degraded images"],
        tags: ["Computer Vision", "HOG + LBP", "SVM", "scikit-learn"],
        color: "#4338ca",
        image: "assets/images/license-plate.svg",
        imageAlt: "A clear and a damaged license plate feeding into a feature extraction and classifier pipeline",
        link: "",
        linkLabel: ""
      },
      {
        // SAMPLE project: made up for the demo
        title: "Credit Card Fraud Detection",
        category: ["Machine Learning"],
        year: "2026",
        role: "Personal project",
        summary: "Catching rare fraud cases in highly imbalanced data",
        description: "Built a fraud detection model on 284,000 card transactions where only 0.17% were fraud. Handled the imbalance with SMOTE and class weights, then tuned XGBoost against precision–recall instead of plain accuracy.",
        results: ["PR-AUC of 0.88 on the hold-out set", "Caught 85% of fraud while keeping false alarms under 1%", "SHAP values to explain why each transaction was flagged"],
        tags: ["XGBoost", "Imbalanced data", "SMOTE", "SHAP"],
        color: "#dc2626",
        image: "assets/images/fraud.svg",
        imageAlt: "Bank card with a fraud risk score beside a list of flagged transactions",
        link: "",
        linkLabel: ""
      },
      {
        title: "Sentiment Analysis of Apple Product Reviews",
        category: ["Machine Learning", "NLP"],
        year: "2025 – 2026",
        role: "Course project · ISP610",
        summary: "Classifying 1,000 scraped reviews as positive or negative",
        description: "Scraped 1,000 Apple product reviews from Trustpilot with Python, then classified them as positive or negative using Decision Tree, Naive Bayes and Random Tree models in Altair AI Studio.",
        results: ["Random Tree scored highest at 74.33% (10-fold)", "Validated with 70/30 and 80/20 splits plus 10- and 20-fold cross-validation"],
        tags: ["NLP", "Web scraping", "Python", "Altair AI Studio"],
        color: "#0f766e",
        image: "assets/images/sentiment.svg",
        imageAlt: "Product review cards labelled positive and negative beside a 74.3% accuracy ring",
        link: "",
        linkLabel: ""
      },
      {
        // SAMPLE project: made up for the demo
        title: "Customer Segmentation with K-Means",
        category: ["Machine Learning", "Analytics"],
        year: "2026",
        role: "Personal project",
        summary: "Grouping online shoppers by how they buy",
        description: "Calculated Recency, Frequency and Monetary (RFM) scores for 4,300 customers of an online retailer, then used K-Means clustering to find natural customer groups. Picked the number of clusters with the elbow method and silhouette score.",
        results: ["3 clear segments: Champions, Regulars and At-risk", "Champions were 18% of customers but 52% of revenue", "Suggested a win-back campaign for the At-risk group"],
        tags: ["Unsupervised learning", "K-Means", "RFM", "Python"],
        color: "#0284c7",
        image: "assets/images/segmentation.svg",
        imageAlt: "Scatter plot of three customer clusters with segment summary cards",
        link: "",
        linkLabel: ""
      },
      {
        title: "Global Economic Tier Classification",
        category: ["Machine Learning"],
        year: "2026",
        role: "Course project · ISP565",
        summary: "Decision tree that sorts countries into economic tiers",
        description: "Built a decision tree model in Weka to classify countries into global economic tiers, a segmentation task similar to risk tiering in banking and insurance.",
        results: ["Accuracy held at 96.3% to 96.8%", "Stable across 10- and 20-fold cross-validation, 70/30 and 80/20 splits, full and reduced datasets"],
        tags: ["Classification", "Decision Tree", "Weka"],
        color: "#b45309",
        image: "assets/images/economic-tiers.svg",
        imageAlt: "Decision tree diagram splitting countries into Tier 1, 2 and 3",
        link: "",
        linkLabel: ""
      },
      {
        // SAMPLE project: made up for the demo
        title: "Klang Valley Air Quality Forecast",
        category: ["Forecasting"],
        year: "2025",
        role: "Personal project",
        summary: "Forecasting the Air Pollution Index a week ahead",
        description: "Used five years of daily Air Pollution Index readings to build time-series forecasts, comparing ARIMA with an LSTM network and testing on haze-season data.",
        results: ["7-day forecast with 12% average error", "LSTM beat ARIMA during haze season"],
        tags: ["Time series", "LSTM", "ARIMA", "Python"],
        color: "#c2410c",
        image: "assets/images/air-quality.svg",
        imageAlt: "Line chart of air pollution readings with a shaded forecast band",
        link: "",
        linkLabel: ""
      },
      {
        title: "Sales Forecasting for Popia Nyum",
        category: ["Forecasting", "Analytics"],
        year: "2026",
        role: "Course project · MAT530",
        summary: "Demand forecast and break-even analysis for a micro-business",
        description: "Fitted linear and quadratic regression models to 7 weeks of sales data to forecast demand, then ran break-even and profit-margin analysis to assess the business's profitability.",
        results: ["Quadratic model fit better: R² 0.6319 vs 0.5208", "Break-even point and profit margin for the owner"],
        tags: ["Regression", "Forecasting", "Business analytics"],
        color: "#be123c",
        image: "assets/images/sales-forecast.svg",
        imageAlt: "Weekly sales points with a linear and a quadratic regression line",
        link: "",
        linkLabel: ""
      },
      {
        // SAMPLE project: made up for the demo
        title: "Selangor Property Price Predictor",
        category: ["Machine Learning"],
        year: "2026",
        role: "Personal project",
        summary: "A live web app that estimates house prices",
        description: "Scraped 6,000 property listings, cleaned them in Pandas and trained a gradient boosting model on size, location and property type. Deployed it as a Streamlit web app so anyone can get an instant price estimate.",
        results: ["R² of 0.81 on unseen listings", "Live app with a simple form and a price range", "Location was the strongest price driver"],
        tags: ["Regression", "Web scraping", "Streamlit", "Deployment"],
        color: "#7c3aed",
        image: "assets/images/house-price.svg",
        imageAlt: "Scatter plot of house size against price with a predicted price card",
        link: "",
        linkLabel: ""
      },
      {
        title: "Lucky 7 — Math Card Game",
        category: ["Fun"],
        year: "2025",
        role: "Co-inventor · International Math Day",
        summary: "A card game that makes arithmetic fun for kids",
        description: "Co-invented Lucky 7, a math card game for children, for International Math Day 2025. It was judged live by 500 parents and children.",
        results: ["Won Best Game", "Won Crowd's Choice"],
        tags: ["Game design", "Math education"],
        color: "#7c3aed",
        image: "assets/images/lucky7.svg",
        imageAlt: "Playing cards showing 3, 4 and 7 with math symbols",
        link: "",
        linkLabel: ""
      }
    ]
  },

  about: {
    title: "About *me*",
    nav: "About",
    photo: "assets/images/portrait.jpg",
    paragraphs: [
      "I'm a Mathematics student at UiTM Shah Alam, specialising in Big Data Analytics, and I want to use machine learning to solve real business problems.",
      "My work so far covers computer vision, fraud detection, customer segmentation, sentiment analysis and forecasting. I like the whole journey: collecting and cleaning messy data, testing models properly with cross-validation, and explaining the result in plain language.",
      "Outside the classroom I tutor Mathematics and Additional Mathematics, led sports events for a college of 1,000 students, and captain a PUBG Mobile esports team that has represented Perak and UiTM nationally. I speak English, Malay and Indonesian, and I'm learning French."
    ],
    stats: [
      { value: "First", label: "Class student" },
      { value: "8", label: "ML & analytics projects" },
      { value: "11/12", label: "Tutoring students improved" }
    ]
  },

  achievements: {
    title: "Awards & *wins*",
    nav: "Awards",
    items: [
      { year: "Now", title: "First Class student", detail: "BSc (Hons) Mathematics, Big Data Analytics at UiTM Shah Alam." },
      { year: "2025", title: "Best Game & Crowd's Choice", detail: "Lucky 7 math card game at International Math Day 2025, judged live by 500 parents and children." },
      { year: "2023 & 2024", title: "Anugerah Rektor: Best Sports Team", detail: "UiTM Perak, as captain of the PUBG Mobile esports team." },
      { year: "2022 & 2026", title: "National esports podium", detail: "2nd (2022) and 3rd (2026) nationally. Represented Perak at SUKMA 2024 and UiTM at SUKIPT 2026." }
    ]
  },

  experience: {
    title: "*Journey*",
    nav: "Journey",
    items: [
      {
        dates: "Mar 2025 — Aug 2027",
        role: "BSc (Hons) Mathematics, Big Data Analytics",
        company: "UiTM Shah Alam",
        url: "",
        summary: "First Class student. Machine learning, statistics, data mining and database systems. Expected graduation August 2027.",
        tags: ["Big Data Analytics", "Machine Learning", "Statistics"]
      },
      {
        dates: "Jan 2025 — Now",
        role: "Private Mathematics Tutor",
        company: "Self-employed",
        url: "",
        summary: "Tutored up to 12 students in Mathematics and Additional Mathematics. Raised 11 of 12 from below 45% to about 70% on the UASA exam, and took one Form 5 student from F to A- in Additional Mathematics.",
        tags: ["Teaching", "Communication"]
      },
      {
        dates: "2024 — 2025",
        role: "Sports & Recreation Exco",
        company: "Alpha College, UiTM Tapah",
        url: "",
        summary: "Ran 6 events for a college of about 1,000 students. As Program Director, led a 14-week virtual run for 680 students.",
        tags: ["Leadership", "Event management"]
      },
      {
        dates: "Oct 2022 — Feb 2025",
        role: "Diploma in Science (Mathematics)",
        company: "UiTM Tapah",
        url: "",
        summary: "CGPA 3.62.",
        tags: ["Mathematics"]
      },
      {
        dates: "2022 — Now",
        role: "PUBG Mobile Team Captain",
        company: "Perak (SUKMA 2024) & UiTM (SUKIPT 2026)",
        url: "",
        summary: "Placed 2nd (2022) and 3rd (2026) nationally. Anugerah Rektor Pasukan Sukan Terbaik UiTM Perak 2023 and 2024.",
        tags: ["Teamwork", "Strategy"]
      }
    ],
    resume: { label: "Download my résumé →", href: "" }   // add e.g. "assets/resume.pdf" to show the link
  },

  skills: {
    title: "What I *use*",
    nav: "Skills",
    groups: [
      { name: "Machine Learning", items: ["Classification", "Regression", "Feature extraction", "Cross-validation", "Hyperparameter tuning"] },
      { name: "Programming", items: ["Python", "SQL", "R", "MATLAB", "C++"] },
      { name: "Libraries", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "OpenCV", "XGBoost", "Streamlit"] },
      { name: "Analytics & BI", items: ["Power BI", "Tableau", "Excel", "Weka", "Altair AI Studio"] },
      { name: "Data & Tools", items: ["MySQL", "MongoDB", "Git", "VS Code", "Google Colab"] },
      { name: "Languages", items: ["English", "Malay", "Indonesian", "French (basic)"] }
    ]
  },

  contact: {
    title: "Let's *talk*",
    nav: "Contact",
    text: "Looking for a data intern from March 2027, or want to chat about a project? My inbox is always open.",
    email: "sanadmifzal31@gmail.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sanad-mifzal-84a22643b" },
      { label: "GitHub", href: "https://github.com/szal31" }
    ]
  },

  footer: {
    text: "Built with data and care."
  }
};
