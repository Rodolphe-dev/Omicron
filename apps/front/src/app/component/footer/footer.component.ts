import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
    selector: "omicron-nx-footer",
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
    content!: string;

    setContent(data: string) {
        this.content = data;
    }
}
