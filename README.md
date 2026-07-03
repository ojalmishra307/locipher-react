# locipher

### Decipher your genes.

Locipher is a free, patient-facing AI tool that explains genetic test results in plain, human language and lets you ask follow-up questions through a built-in AI chat assistant. Patients receiving reports containing variants like `BRCA1 c.5266dupC` are often left confused and anxious. Locipher bridges the gap between complex genomic data and human understanding.

🔗 **Live at:** [locipher.vercel.app](https://locipher.vercel.app/)

---

## The Problem

Genetic testing is more accessible than ever. Understanding your results isn't. Most genetic reports are written for clinicians, filled with terminology that means nothing to the patient holding them. Genetic counselors are expensive and scarce. Patients are left searching Google and walking away more confused than before.

## The Solution

Locipher takes any genetic variant, pulls real clinical data from the ClinVar database, and uses AI to generate a clear, jargon-free explanation any patient can understand - instantly and for free.

---

## Pages

**Landing Page** - Hero section, problem statement, how it works, who it's for, CTA

**App Page** - Variant search, ClinVar data fetch, AI explanation with gene diagram, PDF download, AI Assistant

**About Page** - What Locipher is, who it's for, how it's built

---

## What You Get

- Gene explanation - what the gene normally does, in plain English
- AI Chat - ask Locipher follow-up questions about your report in plain language
- Mutation breakdown - what specifically went wrong
- Concern rating - LOW / MODERATE / HIGH with clear reasoning
- Health implications - what this means practically
- Doctor questions - 4 smart questions for your next appointment
- Gene diagram - visual showing where on the gene the mutation sits
- PDF download - take your report to your appointment

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React |
| Styling | CSS-in-JS |
| Genomics Data | NCBI ClinVar API |
| AI Engine | Groq LLaMA 3.3 70B |
| Deployment | Vercel |

---

## How to Run Locally

```bash
git clone https://github.com/ojalmishra307/locipher-react.git
cd locipher-react
npm install

```
## Example Variants to Try

- `BRCA1 c.5266dupC` - Breast/ovarian cancer risk
- `TP53 R175H` - Tumor suppressor mutation
- `CFTR F508del` - Cystic fibrosis
- `APOE e4` - Alzheimer's risk factor

---

## Disclaimer

Locipher is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified genetic counselor or physician regarding your results.

---

## Built By

**Ojal Mishra** - BTech Biotechnology, Thapar Institute of Engineering & Technology
