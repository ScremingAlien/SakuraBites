import DemoApiSection from "./_homepageComponent/DemoApiSection";
import QuickPicksSection from "./_homepageComponent/QuickPicksSection";

/*------------------------------------
Homepage should include

- category 


--------------------------------------*/
export default function page() {
     return (
          <section className=' py-16'>

               <DemoApiSection />
               <QuickPicksSection />
          </section>
     )
}