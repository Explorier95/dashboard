
package IPN.CBA_Dashboard.controller; 

import org.springframework.web.bind.annotation.RestController; 
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
public class CBADashboardController {
    
    @GetMapping("/hello")
    public String hello() {
        return "<h1>Hello World!</h1>";
    }
}