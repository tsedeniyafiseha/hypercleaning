import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  content: string;
  author: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Essential Cleaning Chemicals Every Business Needs",
    excerpt: "From all-purpose cleaners to specialized disinfectants, learn which cleaning chemicals are essential for maintaining a safe, hygienic workplace in New Zealand.",
    date: "December 1, 2024",
    category: "Guides",
    slug: "essential-cleaning-chemicals",
    author: "Hyper Cleaning Team",
    readTime: "5 min read",
    content: `
      <p>Maintaining a clean and hygienic workplace is crucial for any business in New Zealand. Having the right cleaning chemicals on hand ensures you can tackle any cleaning challenge effectively and safely. Here's our comprehensive guide to the essential cleaning products every business should stock.</p>

      <h2>1. All-Purpose Cleaners</h2>
      <p>All-purpose cleaners are the workhorses of any cleaning program. These versatile products can handle everyday dirt, grime, and light soiling on multiple surfaces including countertops, walls, and equipment.</p>
      <p><strong>Key features to look for:</strong></p>
      <ul>
        <li>pH-neutral formulation for safe use on most surfaces</li>
        <li>Biodegradable ingredients for environmental responsibility</li>
        <li>Concentrated formulas for cost-effectiveness</li>
        <li>Pleasant, non-overpowering scent</li>
      </ul>

      <h2>2. Disinfectants and Sanitizers</h2>
      <p>Especially important in healthcare, food service, and high-traffic areas, disinfectants kill harmful bacteria and viruses. In New Zealand, look for products that meet the requirements of the Therapeutic Goods Administration (TGA) or have proven efficacy against common pathogens.</p>
      <p><strong>Important considerations:</strong></p>
      <ul>
        <li>Contact time required for effectiveness (typically 30 seconds to 10 minutes)</li>
        <li>Spectrum of kill (bacteria, viruses, fungi)</li>
        <li>Surface compatibility</li>
        <li>Food-safe options for kitchen environments</li>
      </ul>

      <h2>3. Degreasers</h2>
      <p>Commercial kitchens, workshops, and industrial facilities need powerful degreasers to cut through oil, grease, and heavy soiling. These specialized cleaners break down stubborn residues that all-purpose cleaners can't handle.</p>
      <p><strong>Applications include:</strong></p>
      <ul>
        <li>Kitchen exhaust systems and range hoods</li>
        <li>Workshop floors and equipment</li>
        <li>Food preparation surfaces</li>
        <li>Industrial machinery</li>
      </ul>

      <h2>4. Glass and Surface Cleaners</h2>
      <p>For streak-free shine on windows, mirrors, and glass surfaces, dedicated glass cleaners are essential. Modern formulations dry quickly and leave no residue.</p>

      <h2>5. Bathroom Cleaners and Descalers</h2>
      <p>Bathrooms require specialized products to tackle limescale, soap scum, and mineral deposits common in New Zealand's water. Acidic cleaners effectively remove these buildups while disinfecting.</p>
      <p><strong>Essential bathroom products:</strong></p>
      <ul>
        <li>Toilet bowl cleaners with descaling action</li>
        <li>Tile and grout cleaners</li>
        <li>Mold and mildew removers</li>
        <li>Drain maintainers</li>
      </ul>

      <h2>6. Floor Cleaners</h2>
      <p>Different floor types require different cleaning solutions. Stock appropriate cleaners for your specific flooring:</p>
      <ul>
        <li><strong>Hard floors:</strong> pH-neutral cleaners that won't damage sealants</li>
        <li><strong>Carpets:</strong> Low-foam extraction cleaners and spot removers</li>
        <li><strong>Vinyl and linoleum:</strong> Non-abrasive, streak-free formulas</li>
      </ul>

      <h2>Safety and Storage Tips</h2>
      <p>Proper handling and storage of cleaning chemicals is crucial:</p>
      <ul>
        <li>Store chemicals in original containers with labels intact</li>
        <li>Keep Safety Data Sheets (SDS) readily accessible</li>
        <li>Never mix different chemicals unless specifically instructed</li>
        <li>Ensure adequate ventilation when using strong chemicals</li>
        <li>Train staff on proper dilution ratios and usage</li>
        <li>Use appropriate PPE (gloves, eye protection) as recommended</li>
      </ul>

      <h2>Choosing Quality Products</h2>
      <p>When selecting cleaning chemicals for your business, consider:</p>
      <ul>
        <li><strong>Efficacy:</strong> Does it work effectively for your specific needs?</li>
        <li><strong>Safety:</strong> Is it safe for your staff and surfaces?</li>
        <li><strong>Environmental impact:</strong> Look for eco-friendly certifications</li>
        <li><strong>Cost-effectiveness:</strong> Consider concentration and dilution rates</li>
        <li><strong>Compliance:</strong> Meets New Zealand health and safety standards</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Investing in the right cleaning chemicals is an investment in your business's health, safety, and professional appearance. At Hyper Cleaning Supplies, we stock a comprehensive range of professional-grade cleaning products suitable for businesses of all sizes across New Zealand.</p>
      <p>Need help selecting the right products for your facility? Contact our team for expert advice tailored to your specific cleaning requirements.</p>
    `,
  },
  {
    id: 2,
    title: "Complete Guide to Floor Care: Products and Techniques",
    excerpt: "Different floor surfaces require different care. Discover the best products and methods for vinyl, tile, carpet, and hardwood floors to extend their lifespan.",
    date: "November 28, 2024",
    category: "Tips",
    slug: "floor-care-guide",
    author: "Hyper Cleaning Team",
    readTime: "7 min read",
    content: `
      <p>Proper floor care is essential for maintaining a professional appearance and extending the life of your flooring investment. Different floor types require specific cleaning approaches, products, and maintenance schedules. This comprehensive guide covers everything you need to know about professional floor care.</p>

      <h2>Understanding Your Floor Type</h2>
      <p>Before selecting cleaning products, identify your floor type. Using the wrong products can cause damage, dullness, or premature wear.</p>

      <h2>Vinyl and Linoleum Floors</h2>
      <p>Vinyl and linoleum are popular in commercial settings due to their durability and easy maintenance.</p>
      <p><strong>Daily Maintenance:</strong></p>
      <ul>
        <li>Sweep or vacuum to remove loose dirt and debris</li>
        <li>Damp mop with pH-neutral cleaner diluted according to instructions</li>
        <li>Avoid excessive water that can seep into seams</li>
      </ul>
      <p><strong>Deep Cleaning:</strong></p>
      <ul>
        <li>Strip old wax or finish buildup quarterly or as needed</li>
        <li>Apply fresh floor finish to restore shine and protection</li>
        <li>Use a floor machine with appropriate pad for best results</li>
      </ul>
      <p><strong>Recommended Products:</strong> pH-neutral floor cleaners, floor strippers, acrylic floor finishes</p>

      <h2>Ceramic and Porcelain Tile</h2>
      <p>Tile floors are durable but require attention to grout lines to prevent discoloration and mold growth.</p>
      <p><strong>Regular Cleaning:</strong></p>
      <ul>
        <li>Sweep or vacuum daily in high-traffic areas</li>
        <li>Mop with alkaline tile cleaner for effective soil removal</li>
        <li>Pay special attention to grout lines</li>
      </ul>
      <p><strong>Grout Maintenance:</strong></p>
      <ul>
        <li>Use grout brush and specialized grout cleaner monthly</li>
        <li>Consider grout sealing to prevent staining</li>
        <li>Address mold immediately with appropriate cleaners</li>
      </ul>

      <h2>Carpet Care</h2>
      <p>Carpets trap dirt and require regular maintenance to maintain appearance and indoor air quality.</p>
      <p><strong>Daily Care:</strong></p>
      <ul>
        <li>Vacuum high-traffic areas daily</li>
        <li>Address spills immediately with spot cleaner</li>
        <li>Use walk-off mats at entrances to reduce soil tracking</li>
      </ul>
      <p><strong>Deep Cleaning:</strong></p>
      <ul>
        <li>Hot water extraction (steam cleaning) every 6-12 months</li>
        <li>Interim cleaning with low-moisture methods between deep cleans</li>
        <li>Professional stain treatment for stubborn marks</li>
      </ul>
      <p><strong>Recommended Products:</strong> Low-foam carpet shampoo, carpet spot removers, carpet protectors</p>

      <h2>Hardwood and Timber Floors</h2>
      <p>Wood floors require gentle care to prevent damage to finishes and the wood itself.</p>
      <p><strong>Daily Maintenance:</strong></p>
      <ul>
        <li>Dust mop or vacuum with hard floor attachment</li>
        <li>Use minimal water - wood and water don't mix</li>
        <li>Clean with wood floor cleaner specifically formulated for sealed wood</li>
      </ul>
      <p><strong>Protection:</strong></p>
      <ul>
        <li>Use felt pads under furniture legs</li>
        <li>Place mats in high-traffic areas</li>
        <li>Refinish or recoat as needed to maintain protection</li>
      </ul>

      <h2>Concrete and Polished Concrete</h2>
      <p>Increasingly popular in commercial and industrial settings, concrete floors are durable but need proper care.</p>
      <p><strong>Maintenance:</strong></p>
      <ul>
        <li>Sweep or dust mop regularly to prevent scratching from grit</li>
        <li>Mop with pH-neutral cleaner</li>
        <li>For polished concrete, use specialized polished concrete cleaner</li>
        <li>Reseal periodically to maintain stain resistance</li>
      </ul>

      <h2>Essential Floor Care Equipment</h2>
      <p>Professional results require the right tools:</p>
      <ul>
        <li><strong>Microfiber mops:</strong> Superior dirt pickup and reduced water usage</li>
        <li><strong>Wet/dry vacuum:</strong> For spills and deep cleaning</li>
        <li><strong>Floor machines:</strong> For stripping, scrubbing, and buffing</li>
        <li><strong>Carpet extractors:</strong> For deep carpet cleaning</li>
        <li><strong>Appropriate mop buckets:</strong> With wringers for proper moisture control</li>
      </ul>

      <h2>Common Floor Care Mistakes to Avoid</h2>
      <ul>
        <li>Using too much water on any floor type</li>
        <li>Applying wrong pH cleaners (acidic on stone, alkaline on wood)</li>
        <li>Neglecting to sweep before mopping (spreads dirt)</li>
        <li>Using dirty mop water (redeposits soil)</li>
        <li>Skipping regular maintenance (leads to costly repairs)</li>
      </ul>

      <h2>Creating a Floor Care Schedule</h2>
      <p><strong>Daily:</strong> Sweep/vacuum high-traffic areas, spot clean spills</p>
      <p><strong>Weekly:</strong> Thorough mopping of all floor areas</p>
      <p><strong>Monthly:</strong> Deep clean grout, treat carpet stains, buff hard floors</p>
      <p><strong>Quarterly:</strong> Strip and refinish resilient floors, deep clean carpets</p>
      <p><strong>Annually:</strong> Professional assessment and maintenance</p>

      <h2>Conclusion</h2>
      <p>Proper floor care protects your investment and maintains a professional appearance. By using the right products and techniques for your specific floor type, you'll extend the life of your flooring and reduce long-term costs.</p>
      <p>Hyper Cleaning Supplies offers a complete range of floor care products and equipment for all floor types. Our team can help you develop a customized floor care program for your facility.</p>
    `,
  },
  {
    id: 3,
    title: "Understanding Disinfectants: What Works Against Viruses and Bacteria",
    excerpt: "Not all disinfectants are created equal. Learn about contact times, active ingredients, and which products meet New Zealand health standards.",
    date: "November 25, 2024",
    category: "Safety",
    slug: "understanding-disinfectants",
    author: "Hyper Cleaning Team",
    readTime: "6 min read",
    content: `
      <p>In today's health-conscious environment, understanding how disinfectants work is more important than ever. This guide explains the science behind disinfection, helping you choose and use products effectively to protect your facility and occupants.</p>

      <h2>The Difference Between Cleaning, Sanitizing, and Disinfecting</h2>
      <p><strong>Cleaning:</strong> Removes visible dirt, debris, and some germs from surfaces. Does not kill microorganisms.</p>
      <p><strong>Sanitizing:</strong> Reduces bacteria to safe levels as determined by public health standards. Typically reduces bacteria by 99.9%.</p>
      <p><strong>Disinfecting:</strong> Kills specific disease-causing organisms. Can eliminate 99.999% of pathogens when used correctly.</p>
      <p><em>Important:</em> Surfaces must be cleaned before disinfecting. Dirt and organic matter can inactivate disinfectants.</p>

      <h2>Common Disinfectant Active Ingredients</h2>
      
      <h3>1. Quaternary Ammonium Compounds (Quats)</h3>
      <p><strong>Effectiveness:</strong> Broad spectrum against bacteria, some viruses, and fungi</p>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Low toxicity and odor</li>
        <li>Non-corrosive to most surfaces</li>
        <li>Effective in hard water</li>
        <li>Leaves residual antimicrobial film</li>
      </ul>
      <p><strong>Limitations:</strong> Less effective against non-enveloped viruses, can be inactivated by organic matter</p>

      <h3>2. Sodium Hypochlorite (Bleach)</h3>
      <p><strong>Effectiveness:</strong> Highly effective against bacteria, viruses, fungi, and spores</p>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Fast-acting</li>
        <li>Inexpensive</li>
        <li>Effective against wide range of pathogens</li>
      </ul>
      <p><strong>Limitations:</strong> Corrosive, strong odor, degrades quickly, can damage fabrics and surfaces</p>

      <h3>3. Hydrogen Peroxide</h3>
      <p><strong>Effectiveness:</strong> Effective against bacteria, viruses, fungi, and spores</p>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Environmentally friendly (breaks down to water and oxygen)</li>
        <li>No toxic residue</li>
        <li>Effective against difficult organisms</li>
      </ul>
      <p><strong>Limitations:</strong> Can bleach fabrics, requires longer contact time than some alternatives</p>

      <h3>4. Alcohol-Based Disinfectants</h3>
      <p><strong>Effectiveness:</strong> Effective against bacteria and enveloped viruses</p>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Fast-acting</li>
        <li>No rinse required</li>
        <li>Evaporates quickly</li>
      </ul>
      <p><strong>Limitations:</strong> Flammable, can damage some plastics, not effective against spores</p>

      <h2>Understanding Contact Time</h2>
      <p>Contact time (or dwell time) is the period a disinfectant must remain wet on a surface to be effective. This is crucial for proper disinfection.</p>
      <p><strong>Typical contact times:</strong></p>
      <ul>
        <li>Alcohol-based: 30 seconds to 1 minute</li>
        <li>Quaternary ammonium: 3-10 minutes</li>
        <li>Bleach solutions: 1-10 minutes</li>
        <li>Hydrogen peroxide: 1-5 minutes</li>
      </ul>
      <p><em>Critical:</em> Always check the product label for specific contact times. Wiping a surface immediately after applying disinfectant renders it ineffective.</p>

      <h2>Proper Disinfection Procedure</h2>
      <ol>
        <li><strong>Clean first:</strong> Remove visible dirt and organic matter</li>
        <li><strong>Apply disinfectant:</strong> Use appropriate concentration</li>
        <li><strong>Maintain wet contact:</strong> Keep surface wet for required time</li>
        <li><strong>Allow to air dry or rinse:</strong> Follow label instructions</li>
      </ol>

      <h2>High-Touch Surfaces Requiring Regular Disinfection</h2>
      <ul>
        <li>Door handles and push plates</li>
        <li>Light switches</li>
        <li>Handrails and grab bars</li>
        <li>Elevator buttons</li>
        <li>Shared equipment and tools</li>
        <li>Phones and keyboards</li>
        <li>Bathroom fixtures</li>
        <li>Food preparation surfaces</li>
      </ul>

      <h2>New Zealand Regulatory Considerations</h2>
      <p>In New Zealand, disinfectants used in healthcare and food service must meet specific standards:</p>
      <ul>
        <li>Healthcare: Products should meet hospital-grade disinfection standards</li>
        <li>Food service: Must be food-safe or require rinsing before food contact</li>
        <li>Workplace: Must comply with Health and Safety at Work Act requirements</li>
      </ul>

      <h2>Safety Considerations</h2>
      <p><strong>Personal Protection:</strong></p>
      <ul>
        <li>Wear appropriate gloves (check chemical compatibility)</li>
        <li>Use eye protection when splashing is possible</li>
        <li>Ensure adequate ventilation</li>
        <li>Never mix different disinfectants (especially bleach and acids)</li>
      </ul>

      <p><strong>Storage:</strong></p>
      <ul>
        <li>Store in original containers</li>
        <li>Keep away from heat and direct sunlight</li>
        <li>Secure storage away from unauthorized access</li>
        <li>Check expiration dates regularly</li>
      </ul>

      <h2>Choosing the Right Disinfectant</h2>
      <p>Consider these factors:</p>
      <ul>
        <li><strong>Target organisms:</strong> What pathogens are you concerned about?</li>
        <li><strong>Surface compatibility:</strong> Will it damage your surfaces?</li>
        <li><strong>Contact time:</strong> Can you maintain wet contact for required time?</li>
        <li><strong>Safety:</strong> Appropriate for your environment and staff?</li>
        <li><strong>Regulatory requirements:</strong> Does it meet industry standards?</li>
        <li><strong>Cost-effectiveness:</strong> Consider dilution rates and coverage</li>
      </ul>

      <h2>Common Mistakes in Disinfection</h2>
      <ul>
        <li>Not cleaning before disinfecting</li>
        <li>Using expired products</li>
        <li>Incorrect dilution ratios</li>
        <li>Insufficient contact time</li>
        <li>Using on incompatible surfaces</li>
        <li>Inadequate staff training</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Effective disinfection requires understanding the products you're using and following proper procedures. By selecting appropriate disinfectants and using them correctly, you can create a safer, healthier environment for everyone in your facility.</p>
      <p>Hyper Cleaning Supplies offers a range of professional-grade disinfectants suitable for healthcare, food service, and commercial applications. Our team can help you select products that meet your specific needs and regulatory requirements.</p>
    `,
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Hyper Cleaning Supplies Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pb-20">
      <div className="max-w-4xl mx-auto px-4 xl:px-0">
        <div className="py-12">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/blog" className="text-sky-500 hover:text-sky-600 text-sm font-medium">
              ← Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-sky-50 rounded-lg border border-sky-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help Choosing Products?</h3>
              <p className="text-gray-700 mb-4">
                Our team of cleaning supply experts is here to help you find the right products for your specific needs.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <span className="text-xs font-semibold text-sky-500 uppercase">{relatedPost.category}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer showNewsletter={false} />
    </main>
  );
}
