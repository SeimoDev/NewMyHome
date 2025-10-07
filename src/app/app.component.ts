import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'NewMyHome';
  isLoaded = false;
  private isOnSecondPage = false; // 跟踪当前是否在第二页
  private animationTimeouts: number[] = []; // 存储动画定时器ID
  
  @ViewChild('centerImage', { static: false }) centerImage!: ElementRef;
  @ViewChild('appContainer', { static: false }) appContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // 等待页面完全加载后再触发动画
    setTimeout(() => {
      this.isLoaded = true;
    }, 100); // 短暂延迟确保DOM完全渲染
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    if (!this.centerImage || !this.appContainer) return;

    const container = this.appContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // 计算总滚动进度 (0 到 1)
    const maxScroll = scrollHeight - clientHeight;
    const totalScrollProgress = Math.min(scrollTop / maxScroll, 1);
    
    // 计算前两页的滚动进度（0 到 0.67，因为有三页）
    // 图片缩放只在前两页之间进行（0 到 0.67 的范围内）
    const twoPageScrollProgress = Math.min(totalScrollProgress / (2/3), 1);
    
    // 计算图片缩放比例：从 80% 缩放到 40%，只在前两页之间缩放
    const initialSize = 80; // 初始大小 80%
    const finalSize = 40;   // 最终大小 40%
    const currentSize = initialSize - (initialSize - finalSize) * twoPageScrollProgress;
    
    // 应用缩放
    const imageElement = this.centerImage.nativeElement;
    this.renderer.setStyle(imageElement, 'max-width', `${currentSize}%`);
    this.renderer.setStyle(imageElement, 'max-height', `${currentSize}%`);
    
    // 检测是否在第二页区域（总滚动进度在 1/3 到 2/3 之间）
    const currentlyOnSecondPage = totalScrollProgress > (1/3) && totalScrollProgress <= (2/3);
    
    if (currentlyOnSecondPage && !this.isOnSecondPage) {
      // 刚进入第二页，触发动画
      this.triggerIconsAnimation();
      this.isOnSecondPage = true;
    } else if (!currentlyOnSecondPage && this.isOnSecondPage) {
      // 离开第二页，重置动画状态
      this.resetIconsAnimation();
      this.isOnSecondPage = false;
    }
  }

  private triggerIconsAnimation() {
    // 清除之前的定时器
    this.clearAnimationTimeouts();
    
    // 获取所有技术图标元素
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
      // 为每个图标添加动画类，带有递增的延迟
      const timeoutId = setTimeout(() => {
        this.renderer.addClass(icon, 'animate-in');
      }, index * 150); // 每个图标延迟150ms出现
      
      this.animationTimeouts.push(window.setTimeout(() => {
        this.renderer.addClass(icon, 'animate-in');
      }, index * 150));
    });
  }

  private resetIconsAnimation() {
    // 清除所有定时器
    this.clearAnimationTimeouts();
    
    // 获取所有技术图标元素并移除动画类
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon) => {
      this.renderer.removeClass(icon, 'animate-in');
    });
  }

  private clearAnimationTimeouts() {
    // 清除所有动画定时器
    this.animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.animationTimeouts = [];
  }
}
