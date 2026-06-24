export const personas = [
  {
    id: "student",
    name: "Sam",
    role: "College Student",
    age: 20,
    avatar: "🎓",
    description: "Sam has $1,500 in savings and receives $300/month pocket money. He wants quick growth to buy a gaming laptop and travel, but lacks patience and financial experience.",
    startingCash: 1500,
    monthlyIncome: 300,
    scenarios: [
      {
        id: "s1_crypto",
        title: "The Moonshot Crypto Hype",
        story: "A WhatsApp group is hyping up 'ElonDogeMoon' coin, claiming it will go to the moon in 3 days. Your friend put all his savings in it. What do you do?",
        options: [
          {
            text: "YOLO! Put $1,200 (80% of savings) to get rich quick.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -1100, investment: 0 },
            explanation: "Classic FOMO (Fear of Missing Out). The coin was a rug-pull. The creators deleted their social media, and your investment crashed by 92%. You lost $1,100!"
          },
          {
            text: "Keep it in a standard savings account. No risk, no loss.",
            risk: "None",
            resultType: "mediocre",
            impact: { cash: 0, investment: 0 },
            explanation: "You saved your money, which is good. But keeping everything in a 2% savings account means inflation is silently eating away your purchasing power over time."
          },
          {
            text: "Ignore the hype and put $200 in a low-cost stock index fund.",
            risk: "Moderate",
            resultType: "smart",
            impact: { cash: -200, investment: 220 },
            explanation: "Great job! A diversified index fund is the foundation of wealth building. In a few weeks, market growth brings your investment to $220. Slow and steady wins."
          }
        ]
      },
      {
        id: "s1_gadget",
        title: "The Sleek Gaming Laptop on BNPL",
        story: "You want a $1,200 gaming laptop. An app offers 'Buy Now Pay Later' (BNPL) with '0% interest' over 6 months, but has fine print about late fees.",
        options: [
          {
            text: "Buy it! It's only $200/month, I can easily cover that.",
            risk: "Moderate",
            resultType: "fumble",
            impact: { cash: -200, debt: 1000, lateFeeRisk: true },
            explanation: "You bought it. But next month you missed a payment because you spent pocket money on a party. The late fees, penalties, and interest rate ballooned. Your credit score took a hit!"
          },
          {
            text: "Buy a $600 refurbished basic laptop for cash.",
            risk: "Low",
            resultType: "smart",
            impact: { cash: -600 },
            explanation: "Smart budgeting! You bought what you needed without taking on debt. You saved $600, which remains in your bank account generating interest."
          },
          {
            text: "Wait 4 months, save $300/month, then buy it for cash.",
            risk: "None",
            resultType: "smart",
            impact: { cash: 0 },
            explanation: "Superb patience! By delaying gratification, you avoid debt and build the discipline of saving up for major assets."
          }
        ]
      },
      {
        id: "s1_insurance",
        title: "The Optional Health Cover",
        story: "Your college offers an optional comprehensive health insurance add-on for $20/month. Standard college clinics only cover basic checkups.",
        options: [
          {
            text: "Skip it. I am 20, active, and indestructible!",
            risk: "High",
            resultType: "fumble",
            impact: { cash: 0, hasHealthInsurance: false },
            explanation: "You saved $20/month. However, you are exposed. If an accident or major illness strikes, you will have to pay the entire medical bill out of pocket."
          },
          {
            text: "Opt-in to the $20/month comprehensive insurance.",
            risk: "None",
            resultType: "smart",
            impact: { cash: -120, hasHealthInsurance: true }, // 6 months premium
            explanation: "Wise decision. Insurance is not an investment; it is risk mitigation. You paid $120, but you are now protected against catastrophic medical expenses."
          }
        ],
        triggerEvent: {
          conditionField: "hasHealthInsurance",
          conditionValue: false,
          eventName: "Slipped on Ice / Bike Accident",
          eventText: "You slipped while riding a bicycle and fractured your wrist. The hospital room, X-ray, and cast cost $1,500. Since you skipped insurance, you must pay the entire bill!",
          penalty: { cash: -1500 }
        }
      },
      {
        id: "s1_p2p",
        title: "Peer-to-Peer 18% Yield App",
        story: "A new P2P app claims you can lend money to other students and earn 18% annual return. High yields! What do you do?",
        options: [
          {
            text: "Put $500 in it. 18% is way better than the bank!",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -500, investment: 100 },
            explanation: "Disaster! Several borrowers defaulted, and the app platform turned out to be unregulated. You only managed to recover $100. High returns always mean high risks."
          },
          {
            text: "Avoid it. Stick to low-risk deposits or diversified funds.",
            risk: "Low",
            resultType: "smart",
            impact: { cash: 0 },
            explanation: "Correct! If a return sounds too good to be true, it almost always is. Preserving your capital is the first rule of investing."
          }
        ]
      }
    ]
  },
  {
    id: "working_woman",
    name: "Priya",
    role: "Working Woman",
    age: 28,
    avatar: "👩‍💼",
    description: "Priya earns $4,000/month. She keeps all her savings in a low-yield savings account or gold jewelry. She wants safety, but inflation is quietly eroding her money.",
    startingCash: 12000,
    monthlyIncome: 4000,
    scenarios: [
      {
        id: "w_insurance_trap",
        title: "The Endowment Insurance Policy",
        story: "A friendly relative who is an insurance agent pitches an 'Endowment Plan'. You pay $300/month for 10 years, and get life cover plus a 'guaranteed' lump sum of cash back. Sounds perfect?",
        options: [
          {
            text: "Buy it. It combines insurance and investment in one!",
            risk: "Low",
            resultType: "fumble",
            impact: { cash: -1800, investment: 1000, hasInsuranceTrap: true }, // 6 months of payments
            explanation: "Fumble! Endowment plans yield only 4-5% returns, which is below inflation, and offer very low life coverage. The agent earned a huge 30% commission, while your money is locked up with poor growth!"
          },
          {
            text: "Buy a cheap Term Life Insurance ($30/month) and put $270/month in Equity Index Funds.",
            risk: "Moderate",
            resultType: "smart",
            impact: { cash: -1800, investment: 2500, hasTermInsurance: true },
            explanation: "Excellent! You separated insurance from investment. Term insurance provides huge coverage for a tiny premium, while index funds grow your wealth at 10-12% long-term."
          },
          {
            text: "Keep all money in gold jewelry.",
            risk: "Low",
            resultType: "mediocre",
            impact: { cash: -1800, investment: 1600, goldHoldings: true },
            explanation: "Gold jewelry has high 'making charges' (10-20%) which you lose instantly. As an investment, physical gold underperforms equities and poses theft/storage risks."
          }
        ]
      },
      {
        id: "w_emergency",
        title: "Creating an Emergency Fund",
        story: "Your company is undergoing restructuring and lay-offs are rumored. You currently have $10,000 in your bank. Do you build an emergency fund?",
        options: [
          {
            text: "Keep it all in savings, and use credit cards if laid off.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: 0, hasEmergencyFund: false },
            explanation: "Relying on credit cards in a job crisis is highly risky. High-interest debt (36%+) will accumulate, leading to a debt spiral."
          },
          {
            text: "Move 6 months of expenses ($6,000) to a Liquid Mutual Fund or high-yield deposit, leaving it strictly for emergencies.",
            risk: "None",
            resultType: "smart",
            impact: { cash: -6000, emergencyFund: 6000, hasEmergencyFund: true },
            explanation: "Perfect! An emergency fund is your financial seatbelt. It gives you peace of mind and prevents you from selling long-term investments in a crisis."
          }
        ],
        triggerEvent: {
          conditionField: "hasEmergencyFund",
          conditionValue: false,
          eventName: "Company Layoffs & Health Scare",
          eventText: "You were laid off and simultaneously had to pay a security deposit for a new lease. Without an emergency fund, you had to swipe your credit card for $4,500, creating high-interest debt!",
          penalty: { cash: -4500, debt: 4500 }
        }
      },
      {
        id: "w_lifestyle",
        title: "The Designer Handbag & Travel temptation",
        story: "You received a $2,000 annual bonus. Your friends are booking a trip to Bali, and there's a luxury designer handbag sale.",
        options: [
          {
            text: "Buy the bag and book the trip on credit card EMI.",
            risk: "Moderate",
            resultType: "fumble",
            impact: { cash: -2000, debt: 1500 },
            explanation: "Lifestyle inflation struck! You spent your entire bonus AND went into debt for depreciating luxury items. This delays your financial freedom."
          },
          {
            text: "Invest $1,500 in your retirement portfolio and spend $500 on a modest local trip.",
            risk: "Low",
            resultType: "smart",
            impact: { cash: -500, investment: 1500 },
            explanation: "Brilliant! You rewarded yourself while prioritizing your future. That $1,500 will compound into a substantial sum over 15 years."
          }
        ]
      }
    ]
  },
  {
    id: "senior_person",
    name: "Mr. Gupta",
    role: "Retired Senior Citizen",
    age: 65,
    avatar: "👴",
    description: "Mr. Gupta just retired with a pension fund of $150,000. He wants safe, monthly income but is targeted by scammers promising high returns and greedy relatives.",
    startingCash: 150000,
    monthlyIncome: 1000,
    scenarios: [
      {
        id: "s_scam_call",
        title: "The High-Yield Unregulated Deposit",
        story: "An agent calls you offering a 'Senior Special Corporate Deposit' yielding 16% interest, compared to the bank's safe 6.5%. It is not backed by government deposit insurance. What do you do?",
        options: [
          {
            text: "Invest $50,000 to maximize my monthly pension.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -50000, investment: 5000 },
            explanation: "Fumble! The company went bankrupt 6 months later. Since corporate deposits are unsecured and lack insurance, you lost $45,000 of your retirement corpus!"
          },
          {
            text: "Put $50,000 into the government-backed Senior Citizen Savings Scheme (SCSS) yielding a safe 8.2%.",
            risk: "None",
            resultType: "smart",
            impact: { cash: -50000, investment: 50000, scssHoldings: true },
            explanation: "Smart and secure! SCSS is government-backed, offers high interest for seniors, and guarantees capital protection. Perfect for retirement."
          }
        ]
      },
      {
        id: "s_tech_scam",
        title: "The Urgent Bank Verification Call",
        story: "You receive an SMS: 'Your bank account will be blocked today. Click this link to verify your identity and update your details.' The page looks exactly like your bank.",
        options: [
          {
            text: "Click the link and fill in your card number and PIN immediately.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -8000 },
            explanation: "Phishing scam! Hackers drained $8,000 from your checking account. Banks never ask for PINs or passwords via SMS links."
          },
          {
            text: "Ignore the message and call the official bank branch manager directly to verify.",
            risk: "None",
            resultType: "smart",
            impact: { cash: 0 },
            explanation: "Excellent vigilance! You spotted the scam and protected your savings from cybercriminals."
          }
        ]
      },
      {
        id: "s_senior_health",
        title: "Health Insurance Premium Hikes",
        story: "Your health insurance renewal premium has increased to $350/month. Some relatives suggest cancelling it, saying 'You have your retirement corpus anyway.'",
        options: [
          {
            text: "Cancel the policy to save the $350/month premium.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: 0, hasSeniorHealthInsurance: false },
            explanation: "Dangerous move! Medical costs for seniors are extremely high. Cancelation leaves you vulnerable to massive hospital bills."
          },
          {
            text: "Pay the premium. Health protection is vital at this age.",
            risk: "None",
            resultType: "smart",
            impact: { cash: -2100, hasSeniorHealthInsurance: true }, // 6 months premium
            explanation: "Wise choice. Even with high premiums, health insurance protects your core retirement corpus from being completely wiped out by a single hospitalization."
          }
        ],
        triggerEvent: {
          conditionField: "hasSeniorHealthInsurance",
          conditionValue: false,
          eventName: "Cardiologist & Joint Surgery Bill",
          eventText: "You experienced chest discomfort and required a coronary angioplasty. The total hospital bill reached $25,000. Since you cancelled your insurance, you had to withdraw $25,000 from your retirement corpus!",
          penalty: { cash: -25000 }
        }
      }
    ]
  },
  {
    id: "high_earner",
    name: "Vikram",
    role: "High-Earning Tech Lead",
    age: 32,
    avatar: "🚀",
    description: "Vikram earns $15,000/month. He spends heavily on luxury lifestyle items, trades complex stock options daily, and has no insurance to cover his large family and mortgage.",
    startingCash: 45000,
    monthlyIncome: 15000,
    scenarios: [
      {
        id: "h_options",
        title: "Leveraged Options Trading",
        story: "A YouTube trader claims he makes $5,000 daily trading weekly options. Vikram wants to double his savings quickly. What does he do?",
        options: [
          {
            text: "Allocate $30,000 to options trading contracts.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -30000, investment: 1500 },
            explanation: "Loss! 90% of active retail traders lose money in options. Leveraged bets went against you during a market correction, wiping out $28,500 in minutes."
          },
          {
            text: "Put $30,000 in index funds and mutual funds via automated monthly plans.",
            risk: "Moderate",
            resultType: "smart",
            impact: { cash: -30000, investment: 32000 },
            explanation: "Smart. Instead of gambling, you chose systematic wealth building. Index funds grow steadily without consuming your mental energy and time."
          }
        ]
      },
      {
        id: "h_luxury_car",
        title: "The Luxury Sports Car",
        story: "You want to buy a $90,000 electric luxury sedan. The dealership offers an 8-year loan with a $1,200/month EMI. What do you do?",
        options: [
          {
            text: "Buy it! My high salary easily covers the monthly payment.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: -15000, debt: 75000 }, // Downpayment
            explanation: "Fumble! A car is a depreciating asset. Taking on a huge loan locks you into high monthly fixed costs, making you vulnerable to job losses or career pivots."
          },
          {
            text: "Buy a reliable $35,000 sedan for cash or with a tiny 2-year loan.",
            risk: "Low",
            resultType: "smart",
            impact: { cash: -35000 },
            explanation: "Great decision. You avoided luxury debt traps and kept your cash flow flexible for wealth-building assets instead of depreciating metal."
          }
        ]
      },
      {
        id: "h_term_insurance",
        title: "The $1 Million Term Policy",
        story: "You have a home mortgage of $400,000 and support your spouse and two kids. A financial advisor suggests buying a $1M Term Life Insurance policy for $80/month. What do you do?",
        options: [
          {
            text: "Skip it. I have some investments and the bank will handle my mortgage.",
            risk: "High",
            resultType: "fumble",
            impact: { cash: 0, hasTermInsurance: false },
            explanation: "Extremely risky! If something happens to you, the bank will foreclose the house, leaving your family homeless and burdened with debt. Your investments aren't enough to cover a $400k mortgage."
          },
          {
            text: "Buy the $1 Million Term Life Insurance policy.",
            risk: "None",
            resultType: "smart",
            impact: { cash: -480, hasTermInsurance: true }, // 6 months premium
            explanation: "Excellent choice! For a very small fee, you have secured your family's future and guaranteed that your mortgage will be paid off if the worst happens."
          }
        ],
        triggerEvent: {
          conditionField: "hasTermInsurance",
          conditionValue: false,
          eventName: "Critical Health Diagnosis & Emergency",
          eventText: "You suffered a severe health scare requiring intensive care. Although you survived, you were out of work for 3 months. Since you didn't have term/disability insurance protection, the mortgage payments accumulated, costing you $20,000 in savings and penalty interest!",
          penalty: { cash: -20000 }
        }
      }
    ]
  }
];
