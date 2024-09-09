import {
  Directive,
  forwardRef,
  HostListener,
  Renderer2,
  ElementRef,
  AfterViewInit,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[pedFileInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputDirective),
      multi: true,
    },
  ],
})
export class FileInputDirective implements ControlValueAccessor, AfterViewInit {
  accept = input<string>('*');

  fileInput: HTMLInputElement;

  onChange: (file: File | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.fileInput.click();
  }

  ngAfterViewInit(): void {
    this.initFileInput();
  }

  writeValue(): void {}

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  private initFileInput(): void {
    this.fileInput = this.renderer.createElement('input');
    this.renderer.setAttribute(this.fileInput, 'type', 'file');
    this.renderer.setStyle(this.fileInput, 'display', 'none');
    this.renderer.setAttribute(this.fileInput, 'accept', this.accept());
    this.renderer.appendChild(document.body, this.fileInput);

    this.renderer.listen(this.fileInput, 'change', (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0] || null;
      if (file) {
        this.onChange(file);
      }
    });
  }
}
