"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    id: "group", question: "I am visiting with", emoji: "👥",
    options: [
      { value: "partner", label: "My Partner", emoji: "💑", desc: "A romantic escape" },
      { value: "family", label: "Family", emoji: "👨‍👩‍👧‍👦", desc: "Creating memories together" },
      { value: "friends", label: "Friends", emoji: "🎉", desc: "A celebration or getaway" },
      { value: "work", label: "Work Team", emoji: "💼", desc: "Business or conference" },
    ],
  },
  {
    id: "priority", question: "What matters most?", emoji: "✨",
    options: [
      { value: "food", label: "Amazing Food", emoji: "🍖", desc: "Grilled meats, fine dining" },
      { value: "relax", label: "Relaxation", emoji: "🌿", desc: "Peace and tranquility" },
      { value: "events", label: "Events & Fun", emoji: "🎊", desc: "Music, parties, celebrations" },
      { value: "privacy", label: "Privacy", emoji: "🔒", desc: "Exclusive and intimate" },
    ],
  },
  {
    id: "duration", question: "How long are you staying?", emoji: "📅",
    options: [
      { value: "day", label: "Day Visit", emoji: "☀️", desc: "Just for the day" },
      { value: "night", label: "1 Night", emoji: "🌙", desc: "An overnight escape" },
      { value: "weekend", label: "Weekend", emoji: "🏖️", desc: "Friday to Sunday" },
      { value: "extended", label: "3+ Nights", emoji: "🗓️", desc: "A proper retreat" },
    ],
  },
];

type Selections = { group?: string; priority?: string; duration?: string };

const itineraries: Record<string, { title: string; description: string; activities: string[]; cta: { label: string; href: string } }> = {
  "partner-food-night": { title: "Romantic Grill Night", description: "A beautifully intimate evening built around our charcoal grill and private garden seating.", activities: ["Deluxe Room with king bed", "Private garden table at sunset", "Chapungu Grill dinner — full chicken & sides", "Morning breakfast included", "Complimentary late checkout"], cta: { label: "Book the Deluxe Room", href: "/accommodation/deluxe-room" } },
  "partner-food-weekend": { title: "Romantic Food Weekend", description: "Two days of great food, beautiful surroundings, and time just for the two of you.", activities: ["Deluxe Room — 2 nights", "Grill dinner Friday & Saturday", "Breakfast both mornings", "Garden walks & sunset views", "Personalised experience"], cta: { label: "Book the Deluxe Room", href: "/accommodation/deluxe-room" } },
  "partner-food-day": { title: "Date Day at Chapungu", description: "A perfect day out — great food, beautiful grounds, no need to rush.", activities: ["Lunch at Chapungu Grill", "Garden walk and photography", "Afternoon drinks in the garden", "Optional late dinner"], cta: { label: "Reserve a Table", href: "/restaurant#reservations" } },
  "partner-food-extended": { title: "Luxury Lovers Retreat", description: "Several days of complete indulgence — finest room, meals, and total privacy.", activities: ["Deluxe Room — 3+ nights", "Daily breakfast included", "Grill dinners & garden dining", "Private garden access", "Customised arrival experience"], cta: { label: "Enquire About This Stay", href: "/contact" } },
  "partner-relax-night": { title: "One Night Retreat", description: "Switch off completely. Peaceful setting, beautiful room, quiet grounds.", activities: ["Deluxe Room — king bed", "Quiet garden evening", "Light dinner at the grill", "Full breakfast in the morning", "Late checkout at noon"], cta: { label: "Book Your Night", href: "/accommodation/deluxe-room" } },
  "partner-relax-weekend": { title: "Couples Wellness Weekend", description: "Unwind together in the tranquil surrounds of Chapungu Estates.", activities: ["Deluxe Room — 2 nights", "Evening garden walks", "Unhurried breakfasts", "Optional grill dinner", "Total privacy, no schedule"], cta: { label: "Book This Weekend", href: "/accommodation/deluxe-room" } },
  "partner-relax-day": { title: "Garden Escape", description: "A peaceful day in our beautiful grounds — no crowds, no rush.", activities: ["Garden seating reservation", "Light lunch at the grill", "Relaxed afternoon walk", "Drinks at sunset"], cta: { label: "Visit for the Day", href: "/contact" } },
  "partner-relax-extended": { title: "Extended Tranquility", description: "Days of complete peace in the heart of Norton.", activities: ["Deluxe Room — 3+ nights", "Full breakfasts each day", "Unstructured days of peace", "Evening dinners as you wish", "Private garden access"], cta: { label: "Enquire Now", href: "/contact" } },
  "partner-events-night": { title: "Romantic Celebration Night", description: "Celebrate something special — anniversary, birthday, or just being together.", activities: ["Deluxe Room", "Decorated room on arrival", "Grill dinner for two", "Optional special dessert", "Champagne arrangements available"], cta: { label: "Book & Tell Us the Occasion", href: "/contact" } },
  "partner-events-weekend": { title: "Weekend Celebration", description: "Make a special occasion unforgettable at Chapungu Estates.", activities: ["Deluxe Room — 2 nights", "Decorated room", "Celebration dinner", "Customised experience", "Photography-worthy moments"], cta: { label: "Plan Your Celebration", href: "/contact" } },
  "partner-events-day": { title: "Special Day Out", description: "Mark the occasion with a beautiful day at Chapungu.", activities: ["Special lunch reservation", "Garden photography", "Surprise arrangements available", "Memorable afternoon"], cta: { label: "Reserve Your Table", href: "/restaurant#reservations" } },
  "partner-events-extended": { title: "Extended Celebration", description: "Give your special occasion the time it deserves.", activities: ["Deluxe Room — 3+ nights", "Multiple celebration dinners", "Customised throughout", "Privacy and luxury"], cta: { label: "Contact Us to Plan", href: "/contact" } },
  "partner-privacy-night": { title: "Private Overnight Escape", description: "Complete privacy for the two of you.", activities: ["Deluxe Room — secluded setting", "Private dining at the garden", "Minimum interruption service", "Late breakfast, late checkout"], cta: { label: "Book the Deluxe Room", href: "/accommodation/deluxe-room" } },
  "partner-privacy-weekend": { title: "Private Weekend for Two", description: "Your own world within Chapungu for a whole weekend.", activities: ["Deluxe Room — 2 nights", "Private garden access", "Meals at your own pace", "Do-not-disturb service"], cta: { label: "Book Now", href: "/accommodation/deluxe-room" } },
  "partner-privacy-day": { title: "Private Day Escape", description: "A quiet, private day — just the two of you.", activities: ["Private garden reservation", "Intimate lunch setting", "Quiet afternoon", "Sunset drinks"], cta: { label: "Reserve Your Space", href: "/contact" } },
  "partner-privacy-extended": { title: "Extended Private Retreat", description: "Your own home away from home for days.", activities: ["Deluxe Room — 3+ nights", "Fully private experience", "Customised service", "Uninterrupted time"], cta: { label: "Enquire Now", href: "/contact" } },
  "family-food-night": { title: "Family Grill Night", description: "The whole family around the grill — the heart of Chapungu.", activities: ["Standard Twin Room", "Chapungu Grill dinner — full chickens", "Kids enjoy the playground", "Breakfast Option 3 in the morning", "Plenty of space to roam"], cta: { label: "Book the Twin Room", href: "/accommodation/standard-twin" } },
  "family-food-weekend": { title: "Family Food Weekend", description: "A weekend built around great food and family time.", activities: ["Standard Twin Room — 2 nights", "Grill dinners both evenings", "Breakfasts included", "Kids playground & grounds", "Family photos in the garden"], cta: { label: "Book the Twin Room", href: "/accommodation/standard-twin" } },
  "family-food-day": { title: "Family Day Out", description: "Bring the whole family for a day of food and fun.", activities: ["Family grill lunch", "Kids playground", "Garden exploration", "Afternoon treats"], cta: { label: "Reserve a Table", href: "/restaurant#reservations" } },
  "family-food-extended": { title: "Extended Family Retreat", description: "Give the family the holiday they deserve.", activities: ["Twin Room — 3+ nights", "All meals included", "Daily playground time", "Garden walks", "Memories for a lifetime"], cta: { label: "Book Your Family Stay", href: "/accommodation/standard-twin" } },
  "family-relax-night": { title: "Family Rest Night", description: "A peaceful overnight for the whole family.", activities: ["Standard Twin Room", "Quiet evening dinner", "Kids sleep well, parents relax", "Slow breakfast in the morning"], cta: { label: "Book the Twin Room", href: "/accommodation/standard-twin" } },
  "family-relax-weekend": { title: "Family Weekend", description: "Rest, recharge, and reconnect as a family.", activities: ["Twin Room — 2 nights", "No schedule, no rush", "Garden time", "Kids play, parents breathe"], cta: { label: "Book Now", href: "/accommodation/standard-twin" } },
  "family-relax-day": { title: "Family Day Out", description: "A gentle day in beautiful surroundings.", activities: ["Garden picnic area", "Kids playground", "Light lunch", "Relaxed afternoon"], cta: { label: "Visit for the Day", href: "/contact" } },
  "family-relax-extended": { title: "Extended Family Holiday", description: "Days of genuine family rest and togetherness.", activities: ["Twin Room — 3+ nights", "Daily breakfasts", "Unstructured days", "Kids love it here"], cta: { label: "Book Now", href: "/accommodation/standard-twin" } },
  "family-events-night": { title: "Family Celebration Night", description: "Mark the occasion with the whole family.", activities: ["Standard Twin Room", "Celebration dinner at the grill", "Decorated table", "Fun for kids and adults"], cta: { label: "Plan the Celebration", href: "/contact" } },
  "family-events-weekend": { title: "Family Party Weekend", description: "A full weekend of family celebration.", activities: ["Twin Room — 2 nights", "Celebration dinner", "Playground & garden games", "Group photos", "Birthday or reunion setup available"], cta: { label: "Book & Tell Us the Occasion", href: "/contact" } },
  "family-events-day": { title: "Family Celebration Day", description: "The whole family together for a special day.", activities: ["Celebration lunch", "Garden party setup available", "Kids entertainment", "Group photography"], cta: { label: "Enquire About Group Booking", href: "/contact" } },
  "family-events-extended": { title: "Family Holiday Celebration", description: "An extended family holiday with a reason to celebrate.", activities: ["3+ nights", "Multiple celebration dinners", "Activities for all ages", "Customised events"], cta: { label: "Plan With Us", href: "/contact" } },
  "family-privacy-night": { title: "Family Private Night", description: "Your family, your space, your pace.", activities: ["Standard Twin Room", "Private dining arrangement", "Quiet garden evening", "Peaceful morning"], cta: { label: "Book the Twin Room", href: "/accommodation/standard-twin" } },
  "family-privacy-weekend": { title: "Private Family Weekend", description: "A private family retreat — just you and yours.", activities: ["Twin Room — 2 nights", "Private garden booking", "Your own schedule", "No crowds"], cta: { label: "Book Now", href: "/accommodation/standard-twin" } },
  "family-privacy-day": { title: "Private Family Day", description: "A quiet, private day for the family.", activities: ["Private garden area", "Family lunch", "Kids playground access", "Relaxed atmosphere"], cta: { label: "Reserve Your Day", href: "/contact" } },
  "family-privacy-extended": { title: "Extended Private Family Stay", description: "Days at your own pace, your own way.", activities: ["Twin Room — 3+ nights", "Your own schedule", "Home away from home"], cta: { label: "Book Now", href: "/accommodation/standard-twin" } },
  "friends-food-night": { title: "Friends Grill Night", description: "Nothing beats a night around the grill with great friends.", activities: ["Multiple rooms available", "Chapungu Grill — whole chickens & pork", "Long table dining setup", "Drinks & great vibes", "Breakfast to start the day right"], cta: { label: "Book Rooms for the Group", href: "/accommodation" } },
  "friends-food-weekend": { title: "Friends Food Weekend", description: "A full weekend of eating, laughing, and making memories.", activities: ["Group room booking", "Friday & Saturday grill dinners", "Breakfasts both mornings", "Garden hangouts", "Group photos"], cta: { label: "Book the Group", href: "/accommodation" } },
  "friends-food-day": { title: "Friends Day Out", description: "Bring the squad for the best day out in Norton.", activities: ["Group grill lunch", "Garden hangout", "Drinks in the afternoon", "Great photos"], cta: { label: "Reserve a Group Table", href: "/restaurant#reservations" } },
  "friends-food-extended": { title: "Extended Friends Getaway", description: "Give yourselves the trip you've been promising.", activities: ["Group rooms — 3+ nights", "Multiple grill dinners", "Full breakfasts", "Endless good times"], cta: { label: "Plan the Trip", href: "/contact" } },
  "friends-relax-night": { title: "Chill Night with Friends", description: "Sometimes you just need to switch off together.", activities: ["Group rooms", "Quiet grill dinner", "Garden evening session", "Sleep well, leave refreshed"], cta: { label: "Book Rooms", href: "/accommodation" } },
  "friends-relax-weekend": { title: "Friends Wellness Weekend", description: "A restorative weekend together — no agenda.", activities: ["Group rooms — 2 nights", "Slow mornings", "Garden time", "Meals when you want them"], cta: { label: "Book the Getaway", href: "/accommodation" } },
  "friends-relax-day": { title: "Chilled Friends Day", description: "The perfect low-key day out.", activities: ["Garden hangout spot", "Light lunch", "Slow afternoon", "Good conversation"], cta: { label: "Reserve a Table", href: "/restaurant#reservations" } },
  "friends-relax-extended": { title: "Extended Friends Retreat", description: "Days of real rest and real connection.", activities: ["3+ nights", "No agenda", "Group meals", "Pure relaxation"], cta: { label: "Plan the Retreat", href: "/contact" } },
  "friends-events-night": { title: "Friends Party Night", description: "The best night out — under African skies.", activities: ["Accommodation for the group", "Celebratory grill dinner", "Private garden space", "Drinks & music", "Unforgettable night"], cta: { label: "Book the Party Night", href: "/contact" } },
  "friends-events-weekend": { title: "Weekend Celebration with Friends", description: "Two full days of celebration.", activities: ["Group rooms — 2 nights", "Celebration dinners", "Party setup available", "Garden space for events", "Birthdays, milestones, reunions"], cta: { label: "Plan Your Celebration", href: "/events" } },
  "friends-events-day": { title: "Group Day Celebration", description: "The group together for a special occasion.", activities: ["Private group area", "Celebration lunch setup", "Garden party vibes", "Group activities"], cta: { label: "Enquire About Group Packages", href: "/contact" } },
  "friends-events-extended": { title: "Extended Friends Celebration", description: "Give the milestone the time it deserves.", activities: ["3+ nights", "Multiple celebration events", "Group activities", "Truly unforgettable"], cta: { label: "Let's Plan It", href: "/contact" } },
  "friends-privacy-night": { title: "Friends Private Night", description: "Just your group — no one else.", activities: ["Private garden booking", "Group grill dinner", "Your space for the evening", "Peace and privacy"], cta: { label: "Book Private Space", href: "/contact" } },
  "friends-privacy-weekend": { title: "Private Group Weekend", description: "Your group, your rules.", activities: ["Group rooms — 2 nights", "Private dining", "Your own garden area", "No interruptions"], cta: { label: "Book Now", href: "/accommodation" } },
  "friends-privacy-day": { title: "Private Group Day", description: "A private space just for your group.", activities: ["Private area booking", "Group lunch", "Exclusive garden access"], cta: { label: "Reserve Private Space", href: "/contact" } },
  "friends-privacy-extended": { title: "Extended Private Group Retreat", description: "Days of privacy and exclusivity.", activities: ["3+ nights", "Private dining throughout", "Your own schedule"], cta: { label: "Enquire Now", href: "/contact" } },
  "work-food-night": { title: "Work Team Dinner Night", description: "End the day right — great food, great team.", activities: ["Team accommodation", "Group grill dinner", "Outdoor dining setup", "Informal team bonding", "Breakfast to start the next day"], cta: { label: "Book Team Accommodation", href: "/accommodation" } },
  "work-food-weekend": { title: "Team Building Food Weekend", description: "Work hard, eat well, bond deeply.", activities: ["Team rooms — 2 nights", "Group dinners both evenings", "Breakfasts included", "Informal team activities", "Refreshed and motivated Monday"], cta: { label: "Plan the Team Weekend", href: "/contact" } },
  "work-food-day": { title: "Team Lunch Day", description: "A working lunch or team lunch in a beautiful setting.", activities: ["Group reservation", "Full grill menu for the team", "Garden setting for informal discussion", "Ideal for small teams"], cta: { label: "Reserve for the Team", href: "/restaurant#reservations" } },
  "work-food-extended": { title: "Extended Team Retreat", description: "Give your team the retreat they've earned.", activities: ["Team rooms — 3+ nights", "Working and dining space", "Team dinners nightly", "Recharge as a unit"], cta: { label: "Plan the Retreat", href: "/contact" } },
  "work-relax-night": { title: "Team Recharge Night", description: "Switch off from work and reconnect as people.", activities: ["Team accommodation", "Casual dinner", "No agenda evening", "Great breakfast to recharge"], cta: { label: "Book Team Rooms", href: "/accommodation" } },
  "work-relax-weekend": { title: "Team Wellness Weekend", description: "Rest and recharge — the best investment in your team.", activities: ["Team rooms — 2 nights", "No formal agenda", "Group meals", "Space to breathe and connect"], cta: { label: "Plan the Team Weekend", href: "/contact" } },
  "work-relax-day": { title: "Team Day Out", description: "A relaxed day away from the office.", activities: ["Group lunch", "Garden space", "Informal team time", "Back to work refreshed"], cta: { label: "Book the Day", href: "/restaurant#reservations" } },
  "work-relax-extended": { title: "Extended Team Rest", description: "Real rest for a high-performing team.", activities: ["3+ nights", "Fully unstructured", "Great food throughout", "Real recovery time"], cta: { label: "Enquire About Team Packages", href: "/contact" } },
  "work-events-night": { title: "Team Celebration Night", description: "Celebrate your team's success in style.", activities: ["Team accommodation", "Celebration dinner", "Award or recognition setup available", "Team bonding evening", "Memorable night together"], cta: { label: "Plan the Celebration", href: "/contact" } },
  "work-events-weekend": { title: "Company Event Weekend", description: "A full company event in a stunning venue.", activities: ["Team rooms — 2 nights", "Conference facilities available", "Celebration dinner", "Team activities", "Professional event support"], cta: { label: "Enquire About Events", href: "/events" } },
  "work-events-day": { title: "Corporate Day Event", description: "A professional daytime event in a memorable setting.", activities: ["Conference or meeting space", "Catered lunch", "Team presentations or workshops", "Networking in the garden"], cta: { label: "Book Conference Space", href: "/conferences" } },
  "work-events-extended": { title: "Extended Company Event", description: "Multi-day corporate experience.", activities: ["3+ nights", "Conference facilities", "Team dinners", "Activities and awards", "Full event support"], cta: { label: "Plan With Our Team", href: "/contact" } },
  "work-privacy-night": { title: "Confidential Team Night", description: "A private, secure setting for sensitive discussions.", activities: ["Private accommodation", "Closed dining", "No external guests", "Full team privacy"], cta: { label: "Book Private Team Space", href: "/contact" } },
  "work-privacy-weekend": { title: "Private Executive Retreat", description: "Senior team strategy in a completely private setting.", activities: ["Executive rooms — 2 nights", "Private dining", "Strategy session space", "Completely confidential"], cta: { label: "Arrange the Retreat", href: "/contact" } },
  "work-privacy-day": { title: "Private Executive Day", description: "A confidential day session for your leadership team.", activities: ["Private conference space", "Closed catering", "No external access"], cta: { label: "Book Private Space", href: "/contact" } },
  "work-privacy-extended": { title: "Extended Executive Retreat", description: "Days of private strategy and focus.", activities: ["3+ nights", "Fully private", "Executive support", "Confidential setting"], cta: { label: "Contact Us", href: "/contact" } },
};

export function JourneyBuilder() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const [done, setDone] = useState(false);

  function select(key: keyof Selections, value: string) {
    const newSel = { ...selections, [key]: value };
    setSelections(newSel);
    if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 300);
    else setTimeout(() => setDone(true), 300);
  }

  function reset() { setStep(0); setSelections({}); setDone(false); }

  const itinerary = done
    ? (itineraries[`${selections.group}-${selections.priority}-${selections.duration}`] ?? null)
    : null;

  const currentStep = steps[step];

  return (
    <section className="py-24 lg:py-32 bg-charcoal overflow-hidden" aria-label="Journey Builder">
      <div className="container-site">
        <div className="text-center mb-16">
          <div className="section-label text-brand-400 mb-3">Personalised for You</div>
          <h2 className="font-display text-5xl text-white font-light">
            Build Your
            <span className="block italic text-brand-300">Perfect Visit</span>
          </h2>
          <p className="font-body text-earth-400 text-sm mt-3 max-w-md mx-auto">Answer three questions and we'll design your ideal Chapungu experience.</p>
        </div>

        {!done && (
          <div className="flex justify-center gap-2 mb-12">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? "w-16 bg-brand-500" : "w-8 bg-earth-800"}`} />
            ))}
          </div>
        )}

        {!done ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">{currentStep.emoji}</span>
              <h3 className="font-display text-3xl text-white font-light">{currentStep.question}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentStep.options.map((opt) => {
                const key = currentStep.id as keyof Selections;
                const selected = selections[key] === opt.value;
                return (
                  <button key={opt.value} onClick={() => select(key, opt.value)}
                    className={`p-6 border text-left transition-all duration-200 ${selected ? "border-brand-500 bg-brand-900/40" : "border-earth-800 bg-earth-900/50 hover:border-brand-600 hover:bg-earth-900"}`}>
                    <div className="text-3xl mb-3">{opt.emoji}</div>
                    <div className="font-display text-xl text-white mb-1">{opt.label}</div>
                    <div className="font-body text-xs text-earth-500">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-6 font-body text-xs text-earth-500 hover:text-earth-300 transition-colors mx-auto block">← Back</button>
            )}
          </div>
        ) : itinerary ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-earth-900 border border-earth-700 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="section-label text-brand-400 mb-2">Your Chapungu Experience</div>
                  <h3 className="font-display text-3xl text-white">{itinerary.title}</h3>
                </div>
                <button onClick={reset} className="text-earth-500 hover:text-earth-300 font-body text-xs transition-colors shrink-0">Start over</button>
              </div>
              <p className="font-body text-earth-300 leading-relaxed mb-8">{itinerary.description}</p>
              <div className="mb-8">
                <div className="font-body text-xs font-semibold text-brand-400 tracking-wide uppercase mb-4">What's included</div>
                <ul className="space-y-2">
                  {itinerary.activities.map((a) => (
                    <li key={a} className="flex items-start gap-3 font-body text-sm text-earth-300">
                      <span className="text-brand-500 mt-0.5 shrink-0">✓</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href={itinerary.cta.href} className="btn-gold flex-1 text-center justify-center">{itinerary.cta.label}</Link>
                <Link href="/contact" className="border border-earth-600 text-earth-300 hover:text-white hover:border-brand-500 px-4 py-2.5 font-body text-sm transition-colors">Ask Us Anything</Link>
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-6 flex-wrap">
              {Object.entries(selections).map(([k, v]) => {
                const stepData = steps.find(s => s.id === k);
                const opt = stepData?.options.find(o => o.value === v);
                return opt ? <span key={k} className="font-body text-xs bg-earth-800 text-earth-300 px-3 py-1 rounded-full">{opt.emoji} {opt.label}</span> : null;
              })}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-earth-500 font-body mb-4">We'd love to help you plan the perfect visit.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset} className="border border-earth-600 text-earth-300 hover:text-white px-4 py-2.5 font-body text-sm transition-colors">Try again</button>
              <Link href="/contact" className="btn-gold">Talk to us</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
