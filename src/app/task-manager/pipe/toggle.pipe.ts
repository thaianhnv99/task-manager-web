import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'togglePipe'
})

export class ToggleFipe implements PipeTransform {
  transform(i: number, functionToggle: (_: any) => void) {
    return () => functionToggle(i);
  }
}
