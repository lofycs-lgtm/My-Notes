#include<stdio.h>
#include<string.h>

typedef struct student{
    float cpi;
    int rno;
    char branch[10];
}stu;

int main(){
    
    /*----------------- Revision ----------------*/
    
    stu s1;
    s1.cpi=9.3;
    s1.rno=7;
    strcpy(s1.branch,"CE");

    stu *sp1; //struct student *sp1;
    

    sp1=&s1;
    sp1->cpi=9.3;
    sp1->rno=7;
    scanf("%s",sp1->branch);
    
    printf("%p %p %p %p",sp1, &sp1->cpi, &s1.cpi, &s1);
    
    
    
    /* -------------Pointer and Structure's arrya ------------ */
    
    stu s[100];
    
    //stu *sp1; //struct student *sp1;

    
    sp1=&s[0]; //sp1=s;
  
    
    
    for(int i=0;i<100;i++,sp1++){
        if(i<50)
            strcpy(sp1->branch,"CE");
        else
            strcpy(sp1->branch,"Elect");
        
        if(!strcmp(sp1->branch,"CE")){
            sp1->cpi=9.9;
            sp1->rno=i;
        }
        else
        {
            sp1->cpi=4.9;
            sp1->rno=i;
        }
    }
      
    return 0;
}

