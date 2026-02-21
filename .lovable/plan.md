

# Engagement Boost Plan for DIVOC

Here are high-impact features to keep visitors browsing longer and coming back.

---

## 1. Announcement Banner (Urgency + FOMO)

A slim, animated banner at the very top of the site with rotating messages like "Free shipping on orders over 50 EUR", "New drops every Friday", or a countdown timer for a limited collection. This creates urgency and gives visitors a reason to act now.

## 2. Instagram / Lookbook Gallery Section

A new homepage section showing lifestyle imagery in a masonry or carousel layout, titled something like "DIVOC IN THE WILD" or "#DIVOCLEGACY". This keeps people scrolling, builds brand identity, and connects to social proof. Clicking an image can link to the product or Instagram.

## 3. "New Arrivals" Badge + Countdown Timer

Add a "NEW" badge on recently added products and optionally a "Drop ends in..." countdown on featured items. This creates urgency and highlights fresh content, giving returning visitors something new to see.

## 4. Smooth Page Transitions

Add animated route transitions (fade/slide) between pages using framer-motion's `AnimatePresence`. This makes navigation feel premium and app-like, reducing the perception of page loads and keeping people immersed.

## 5. "You May Also Like" on Product Pages

Add a related products section at the bottom of each product detail page, showing 4 products from the same category. This keeps visitors browsing instead of leaving after viewing one product.

## 6. Back to Top Button

A floating button that appears after scrolling down, allowing quick return to the top. Small UX detail that reduces friction on long pages.

---

## Technical Details

### Files to create:
- `src/components/layout/AnnouncementBar.tsx` -- rotating top banner
- `src/components/home/InstagramSection.tsx` -- lifestyle gallery section
- `src/components/products/RelatedProducts.tsx` -- "You may also like" grid
- `src/components/layout/BackToTopButton.tsx` -- floating scroll button
- `src/components/layout/PageTransition.tsx` -- route transition wrapper

### Files to modify:
- `src/components/layout/Layout.tsx` -- add AnnouncementBar + BackToTopButton
- `src/pages/Index.tsx` -- add InstagramSection
- `src/pages/ProductDetailPage.tsx` -- add RelatedProducts section
- `src/lib/i18n.ts` -- add translation keys for new sections (all 3 languages)
- `src/components/home/index.ts` -- export new component
- `src/components/home/FeaturedProducts.tsx` -- add "NEW" badge logic
- `src/App.tsx` -- wrap routes with PageTransition for animated transitions

### Implementation sequence:
1. Add i18n keys for all new sections
2. Build AnnouncementBar and add to Layout
3. Build InstagramSection and add to homepage
4. Add "NEW" badge to product cards in FeaturedProducts
5. Build RelatedProducts and add to ProductDetailPage
6. Build BackToTopButton and add to Layout
7. Add PageTransition wrapper for route animations

