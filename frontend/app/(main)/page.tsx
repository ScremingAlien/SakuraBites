// import DemoApiSection from "./_homepageComponent/DemoApiSection";
import ExploreCategorys from "./_homepageComponent/ExploreCategorys";
import MostPopularSection from "./_homepageComponent/MostPopularSection";
import QuickPicksSection from "./_homepageComponent/QuickPicksSection";

/*------------------------------------
Homepage should include

- category 
 
--------------------------------------*/
export default function page() {
     return (
          <section className=' py-16 space-y-16'>
{/* 
               <DemoApiSection /> */}
               <MostPopularSection/>
               <ExploreCategorys/>
               <QuickPicksSection />
          </section>
     )
}