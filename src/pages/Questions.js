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
      question: "How can I place an order?",
      answer:
        "You can place an order directly on our website, visit our stores, or contact us via phone/WhatsApp.",
    },
    {
      id: 3,
      question: "Do you deliver across Uganda?",
      answer:
        "Yes, we deliver gypsum products and services across all regions of Uganda.",
    },
    {
      id: 4,
      question: "Can I request a custom ceiling design?",
      answer:
        "Absolutely! We specialize in custom ceiling and partition designs tailored to your needs.",
    },
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
