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
    intro: "Machine learning, data engineering and analytics, from my degree and my own projects. Click any one for the details.",
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
        title: "Malaysia Cost of Living Data Pipeline",
        category: ["Data Engineering", "Analytics"],
        year: "2026",
        role: "Personal project",
        summary: "A pipeline that collects, checks and publishes data every day by itself",
        description: "Every day a GitHub Actions job downloads Malaysia's fuel prices, ringgit exchange rates and inflation by state, checks them with dbt tests on DuckDB, and publishes them to a live page. If a source fails its checks, its last good data stays up and I get an email.",
        results: ["Scheduled to run every evening with no manual step", "Blocked a real Bank Negara server error: old data stayed, the page flagged it, the email went out", "Fuel prices since 2017, 26 currencies since 2020, inflation since 2010"],
        tags: ["dbt", "DuckDB", "GitHub Actions", "Data quality", "Streamlit"],
        color: "#d9481f",
        image: "assets/images/cost-of-living.png",
        imageAlt: "Line chart of RON95 market, BUDI95 and diesel prices in Malaysia",
        link: "https://malaysia-cost-of-living-data-pipeline.streamlit.app/",
        linkLabel: "Open the live page"
      },
      {
        title: "Malaysia Economy AI Assistant",
        category: ["Machine Learning", "NLP"],
        year: "2026",
        role: "Personal project",
        summary: "RAG chatbot that answers from Bank Negara reports and cites the page",
        description: "Ask about Malaysia's economy in English or Malay and get a short answer from Bank Negara reports with the page for every fact. Searches 800 passages with Gemini embeddings, and a lookup tool answers inflation questions from official price data.",
        results: ["28 of 31 test report questions answered correctly (graded by hand), including all 11 in Malay", "Embeddings found the right page for 90% of questions, against 29% for keyword search", "Refused all 5 questions the reports can't answer instead of guessing"],
        tags: ["RAG", "Gemini", "Embeddings", "Evaluation", "Streamlit"],
        color: "#2a78d6",
        image: "assets/images/economy-rag.png",
        imageAlt: "Bar chart comparing keyword, embedding and hybrid search accuracy",
        link: "https://malaysia-economic-ai-assistant.streamlit.app/",
        linkLabel: "Try the assistant"
      },
      {
        title: "Malay Tweet Sentiment with BERT",
        category: ["Machine Learning", "NLP"],
        year: "2026",
        role: "Personal project",
        summary: "Fine-tuned transformers for Malay and Manglish tweets",
        description: "Compared a TF-IDF baseline with two fine-tuned transformers on 2,000 human-labelled Malaysian tweets, all trained on a CPU laptop. The model is on Hugging Face with a live demo.",
        results: ["Fine-tuning raised test macro-F1 from 0.58 to 0.63", "Chose the smaller Malaysian BERT: same accuracy at 2.5 times less size", "Read the 105 wrong answers to find why: Neutral mix-ups, disputed labels and sarcasm"],
        tags: ["BERT", "PyTorch", "Transformers", "Hugging Face"],
        color: "#0f766e",
        image: "assets/images/malay-sentiment.png",
        imageAlt: "Bar chart comparing the baseline and two transformer models",
        link: "https://malay-tweet-sentiment-analysis.streamlit.app/",
        linkLabel: "Try the demo"
      },
      {
        title: "Demand Forecasting and Inventory Planning",
        category: ["Machine Learning", "Forecasting"],
        year: "2026",
        role: "Personal project",
        summary: "Can a better forecast let a store hold less stock?",
        description: "Forecast weekly demand for 50 top-selling Walmart food items with LightGBM, tuned with Optuna and tracked in MLflow, then backtested on 26 unseen weeks and turned into an inventory policy.",
        results: ["20.1% WAPE, against 22.3% for last-week naive", "15% less average inventory than the best simple method, at the same 98% service level", "SHAP showed last week's sales matter far more than price"],
        tags: ["LightGBM", "Optuna", "SHAP", "MLflow"],
        color: "#7c3aed",
        image: "assets/images/demand-forecast.png",
        imageAlt: "Chart of inventory needed by each forecasting method",
        link: "https://github.com/szal31/Demand-Forecasting-Inventory-of-Walmart",
        linkLabel: "View on GitHub"
      },
      {
        title: "Rapid KL Rail Ridership",
        category: ["Analytics"],
        year: "2026",
        role: "Personal project",
        summary: "How Klang Valley rail recovered after COVID",
        description: "Explored daily ridership from January 2019 on data.gov.my, with an interactive app to filter by line, period and day type, covering recovery, commuting patterns and public holidays.",
        results: ["The 4 original lines reached 116% of 2019 riders in 2025", "MRT Kajang overtook LRT Kelana Jaya as the busiest line", "Weekday public holidays cut ridership by 25–44%"],
        tags: ["Python", "Altair", "Streamlit", "Open data"],
        color: "#0369a1",
        image: "assets/images/rapidkl.png",
        imageAlt: "Line chart of rail ridership recovering after 2020",
        link: "https://rapidkl-ridership-analysis.streamlit.app/",
        linkLabel: "Open the app"
      },
      {
        title: "Malaysia Inflation Dashboard",
        category: ["Analytics"],
        year: "2026",
        role: "Personal project",
        summary: "Where prices are rising fastest, by state and category",
        description: "A three-page Power BI dashboard on OpenDOSM's consumer price index, with a state heatmap and a drill-through into what drives inflation in each state.",
        results: ["Inflation ranged from 0.5% in Sarawak to 2.4% in Negeri Sembilan and Labuan (Sep 2026)", "Prices in Putrajaya rose most since January 2020, up 19.3%"],
        tags: ["Power BI", "DAX", "Power Query"],
        color: "#b45309",
        image: "assets/images/inflation-dashboard.png",
        imageAlt: "Power BI dashboard overview page of inflation by state",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZmZjNDg2ODItNzJhMy00OTllLWJmNTYtM2Q5MDg4YWFiMGQxIiwidCI6ImNkY2JiMGUyLTlmZWEtNGY1NC04NjcwLTY3MjcwNzc5N2FkYSIsImMiOjEwfQ%3D%3D",
        linkLabel: "Open the dashboard"
      },
      {
        title: "RFM Customer Segmentation in SQL",
        category: ["Analytics"],
        year: "2026",
        role: "Personal project",
        summary: "Which customers drive revenue, and who to win back",
        description: "Segmented customers of a UK online gift retailer by recency, frequency and monetary value in SQL, from about 1.07M transactions, and turned the segments into marketing actions.",
        results: ["Champions are 26% of customers but 72% of revenue", "Found 443 high-value at-risk customers worth £1.4M as the best win-back target"],
        tags: ["SQL", "RFM", "Cohort analysis"],
        color: "#be185d",
        image: "assets/images/rfm-segments.png",
        imageAlt: "Chart of revenue share by customer segment",
        link: "https://github.com/szal31/RFM-Customer-Segmentation-Using-SQL",
        linkLabel: "View on GitHub"
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
      "My work so far covers data pipelines, RAG, sentiment analysis, computer vision, forecasting and customer segmentation. I like the whole journey: collecting and cleaning messy data, testing models properly with cross-validation, and explaining the result in plain language.",
      "Outside the classroom I tutor Mathematics and Additional Mathematics, led sports events for a college of 1,000 students, and captain a PUBG Mobile esports team that has represented Perak and UiTM nationally. I speak English, Malay and Indonesian, and I'm learning French."
    ],
    stats: [
      { value: "First", label: "Class student" },
      { value: "11", label: "ML & analytics projects" },
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
      { name: "Machine Learning", items: ["Classification", "Regression", "Feature extraction", "Cross-validation", "Hyperparameter tuning", "RAG", "Transformers fine-tuning"] },
      { name: "Programming", items: ["Python", "SQL", "R", "MATLAB", "C++"] },
      { name: "Libraries", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "OpenCV", "XGBoost", "LightGBM", "PyTorch", "Transformers", "Streamlit"] },
      { name: "Analytics & BI", items: ["Power BI", "Tableau", "Excel", "Weka", "Altair AI Studio"] },
      { name: "Data & Tools", items: ["MySQL", "MongoDB", "dbt", "DuckDB", "GitHub Actions", "MLflow", "Git", "VS Code", "Google Colab"] },
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
