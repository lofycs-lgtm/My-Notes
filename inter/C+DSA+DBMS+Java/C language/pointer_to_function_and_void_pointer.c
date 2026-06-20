#include<stdio.h>
#include<string.h>

void sort(void *ptr, int n, int elem_size, int (*compare)(void *, void *)) {
    char *cptr = (char *)ptr;
    for(int i = 0; i < n - 1; i++) {
        int min_index = i;
        for(int j = i + 1; j < n; j++) {
            if(compare(cptr + min_index * elem_size, cptr + j * elem_size)) {
                min_index = j;
            }
        }
        for(int k = 0; k < elem_size; k++) {
            char temp = cptr[min_index * elem_size + k];
            cptr[min_index * elem_size + k] = cptr[i * elem_size + k];
            cptr[i * elem_size + k] = temp;
        }
    }
}

int compare_int(void *address1, void *address2) {
    if(*((int *)address1) > *((int *)address2))
        return 1;
    return 0;
}

int compare_float(void *address1, void *address2) {
    if(*((float *)address1) > *((float *)address2))
        return 1;
    return 0;
}

typedef
struct {
    char name[20];
    int marks;
}Student;

int compare_student_marks(void *address1, void *address2) {
    if(((Student *)address1)->marks > ((Student *)address2)->marks)
        return 1;
    return 0;
}

int compare_student_name(void *address1, void *address2) {
    if(strcmp(((Student *)address1)->name, ((Student *)address2)->name) > 0)
        return 1;
    return 0;
}

int main() {

    int arr[5] = {3, 2, 1, 6, 4};
    sort(arr, 5, sizeof(int), compare_int);
    for(int i = 0; i < 5; i++)
        printf("%d ", arr[i]);
    printf("\n\n");

    float arr2[5] = {3.3, 2.2, 1.1, 6.6, 4.4};
    sort(arr2, 5, sizeof(float), compare_float);
    for(int i = 0; i < 5; i++)
        printf("%.1f ", arr2[i]);
    printf("\n\n");

    Student students[5] = {{"Jalaj", 24}, {"Vanaj", 23}, {"Khush", 32},
                            {"Ditya", 35}, {"Manav", 36}};
    sort(students, 5, sizeof(Student), compare_student_marks);
    for(int i = 0; i < 5; i++)
        printf("%s %d\n", students[i].name, students[i].marks);
    printf("\n");

    sort(students, 5, sizeof(Student), compare_student_name);
    for(int i = 0; i < 5; i++)
        printf("%s %d\n", students[i].name, students[i].marks);
    printf("\n");

    return 0;
}
