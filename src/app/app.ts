import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from './services/project.service';
import { PlatformService } from './services/platform.service';
import { NavbarComponent } from './components/navbar/navbar';
import { AnnouncementBarComponent } from './components/announcement-bar/announcement-bar';
import { HeroComponent } from './components/hero/hero';
import { VideoPlayerComponent } from './components/video-player/video-player';
import { InteractiveDemoComponent } from './components/interactive-demo/interactive-demo';
import { FeaturesComponent } from './components/features/features';
import { CostCalculatorComponent } from './components/cost-calculator/cost-calculator';
import { ScenariosComponent } from './components/scenarios/scenarios';
import { SolutionsComponent } from './components/solutions/solutions';
import { EstimatorComponent } from './components/estimator/estimator';
import { RoadmapComponent } from './components/roadmap/roadmap';
import { QuizComponent } from './components/quiz/quiz';
import { ComparisonComponent } from './components/comparison/comparison';
import { PricingComponent } from './components/pricing/pricing';
import { FaqComponent } from './components/faq/faq';
import { FooterComponent } from './components/footer/footer';
import { PaymentModalComponent } from './components/payment-modal/payment-modal';
import { WhatsAppModalComponent } from './components/whatsapp-modal/whatsapp-modal';
import { ClientPortalComponent } from './components/client-portal/client-portal';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    NavbarComponent,
    AnnouncementBarComponent,
    HeroComponent,
    VideoPlayerComponent,
    InteractiveDemoComponent,
    FeaturesComponent,
    CostCalculatorComponent,
    ScenariosComponent,
    SolutionsComponent,
    EstimatorComponent,
    RoadmapComponent,
    QuizComponent,
    ComparisonComponent,
    PricingComponent,
    FaqComponent,
    FooterComponent,
    PaymentModalComponent,
    WhatsAppModalComponent,
    ClientPortalComponent,
    CheckoutPageComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  projectService = inject(ProjectService);
  platformService = inject(PlatformService);
}
