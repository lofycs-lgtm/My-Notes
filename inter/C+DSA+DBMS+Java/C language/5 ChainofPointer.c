 /* ---------------- Chain of Pointer -------------------*/
#include<stdio.h>
#include<string.h>

int main(){
    int data=10;
    int *ptr1;
    int * *ptr2;

    
    ptr1=&data;
    ptr2=&ptr1;   //data <--------- ptr1 <---------ptr2
    
    
    printf("%p %p %p\n",&data,&ptr1,&ptr2); // All 3 will have different addresses
    printf("%p %p %p\n",&data,ptr1,ptr2); // First two values should be same
    printf("%p %p %p\n",&data,&ptr1,ptr2); // Last two values should be same
    
    data=5;
    printf("%d\n",data);
    *ptr1=7;
    printf("%d\n",data);
    **ptr2=9;
    printf("%d\n",data);
    
    scanf("%d",&data);
    scanf("%d",ptr1);
    scanf("%d",*ptr2);
    
    printf("%d",data);
    printf("%d",*ptr1);
    printf("%d",**ptr2);

      
    return 0;
}
