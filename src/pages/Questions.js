import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

function FAQPage() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Static FAQs
  const faqs = [
    {
      id: 1,
      question: "What services does Banx Gypsum offer?",
      answer:
        "We provide gypsum ceiling installation, partitioning, wall skimming, and supply of high-quality gypsum materials.",
    },
    {
      id: 2,
      question: "Do you provide installation services or only materials?",

      answer:
        "We can buy material and also  do the Professional installation and ceiling finishing",
    },
    {
      id: 3,
      question: "Is gypsum ceiling durable?",
      answer:
        "Yes. Gypsum ceilings do not crack, resist heat, and can last 10+ years if installed correctly and kept dry.",
    },
    {
      id: 4,
      question: "Can I request a custom ceiling design?",
      answer:
        "Absolutely! We specialize in custom ceiling and partition designs tailored to your needs.",
    },

    {id: 5,
      question: "Can gypsum ceilings be designed in different styles?",
      answer:
        "Yes. We create custom designs, including Plain flat ceilings, Modern layered ceilings, LED & strip lighting ceilings.",
        
    }
  ];

  return (
    <div className="container my-5" data-aos="fade-up">
      <h2 className="text-center mb-3 fw-bold" style={{ color: "#ff7f00" }}>
        Frequently Asked Questions
      </h2>
      <p className="text-center text-muted mb-5">
        Here are some of the most common questions our clients ask us.
      </p>

      <div className="accordion shadow-sm rounded" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div
            className="accordion-item border-0 mb-3 rounded shadow-sm"
            key={faq.id}
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <h2 className="accordion-header" id={`heading${faq.id}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${faq.id}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${faq.id}`}
                style={{ fontWeight: "600", fontSize: "1.05rem" }}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${faq.id}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              aria-labelledby={`heading${faq.id}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
